import * as React from 'react'
import { toast } from 'sonner'

import { useAsRef } from '@/hooks/use-as-ref'
import { useLazyRef } from '@/hooks/use-lazy-ref'
import { getIsInPopover } from '@/lib/data-grid'

const DEFAULT_MAX_HISTORY = 100
const BATCH_TIMEOUT = 300

interface HistoryEntry<TData> {
  variant: 'cells_update' | 'rows_add' | 'rows_delete'
  count: number
  timestamp: number
  undo: (currentData: TData[]) => TData[]
  redo: (currentData: TData[]) => TData[]
}

interface UndoRedoCellUpdate {
  rowId: string
  columnId: string
  previousValue: unknown
  newValue: unknown
}

interface StoreState<TData> {
  undoStack: HistoryEntry<TData>[]
  redoStack: HistoryEntry<TData>[]
  hasPendingChanges: boolean
}

// `notify` is intentionally omitted — it is an internal implementation detail
interface Store<TData> {
  subscribe: (callback: () => void) => () => void
  getState: () => StoreState<TData>
  push: (entry: HistoryEntry<TData>) => void
  undo: () => HistoryEntry<TData> | null
  redo: () => HistoryEntry<TData> | null
  clear: () => void
  setPendingChanges: (value: boolean) => void
}

interface UseDataGridUndoRedoProps<TData> {
  data: TData[]
  onDataChange: (data: TData[]) => void
  getRowId: (row: TData) => string
  maxHistory?: number
  enabled?: boolean
}

interface UseDataGridUndoRedoReturn<TData> {
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  trackCellsUpdate: (updates: UndoRedoCellUpdate[]) => void
  trackRowsAdd: (rows: TData[]) => void
  trackRowsDelete: (rows: TData[]) => void
}

// Stable module-level selectors prevent `useCallback` inside `useStore`
// from invalidating `getSnapshot` on every render.
function selectCanUndo<TData>(state: StoreState<TData>): boolean {
  return state.undoStack.length > 0 || state.hasPendingChanges
}

function selectCanRedo<TData>(state: StoreState<TData>): boolean {
  return state.redoStack.length > 0
}

function useStore<T>(
  store: Store<T>,
  selector: (state: StoreState<T>) => boolean
): boolean {
  const getSnapshot = React.useCallback(
    () => selector(store.getState()),
    [store, selector]
  )
  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot)
}

function buildIndexById<TData>(
  data: TData[],
  getRowId: (row: TData) => string
): Map<string, number> {
  const map = new Map<string, number>()
  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    if (row) map.set(getRowId(row), i)
  }
  return map
}

function getPendingKey(rowId: string, columnId: string): string {
  return `${rowId}\0${columnId}`
}

function formatActionCount(count: number): string {
  return `${count} action${count !== 1 ? 's' : ''}`
}

function useDataGridUndoRedo<TData>({
  data,
  onDataChange,
  getRowId,
  maxHistory = DEFAULT_MAX_HISTORY,
  enabled = true,
}: UseDataGridUndoRedoProps<TData>): UseDataGridUndoRedoReturn<TData> {
  const propsRef = useAsRef({
    data,
    onDataChange,
    getRowId,
    maxHistory,
    enabled,
  })

  const listenersRef = useLazyRef(() => new Set<() => void>())
  const stateRef = useLazyRef<StoreState<TData>>(() => ({
    undoStack: [],
    redoStack: [],
    hasPendingChanges: false,
  }))

  const pendingBatchRef = React.useRef<{
    byKey: Map<string, UndoRedoCellUpdate>
    timeoutId: ReturnType<typeof setTimeout> | null
  }>({ byKey: new Map(), timeoutId: null })

  // `useLazyRef` instead of `useMemo` — stores are mutable and should be
  // created exactly once. `useMemo` can re-run in StrictMode.
  // `notify` lives in a closure so it never escapes the public interface.
  const store = useLazyRef<Store<TData>>(() => {
    const notify = () => {
      for (const listener of listenersRef.current) {
        listener()
      }
    }

    return {
      subscribe: callback => {
        listenersRef.current.add(callback)
        return () => listenersRef.current.delete(callback)
      },
      getState: () => stateRef.current,
      push: entry => {
        const { undoStack } = stateRef.current
        const newUndoStack = [...undoStack, entry]
        if (newUndoStack.length > propsRef.current.maxHistory) {
          newUndoStack.shift()
        }
        stateRef.current = {
          undoStack: newUndoStack,
          redoStack: [],
          hasPendingChanges: false,
        }
        notify()
      },
      undo: () => {
        const { undoStack, redoStack } = stateRef.current
        const entry = undoStack.at(-1)
        if (!entry) return null
        stateRef.current = {
          undoStack: undoStack.slice(0, -1),
          redoStack: [...redoStack, entry],
          hasPendingChanges: false,
        }
        notify()
        return entry
      },
      redo: () => {
        const { undoStack, redoStack } = stateRef.current
        const entry = redoStack.at(-1)
        if (!entry) return null
        stateRef.current = {
          undoStack: [...undoStack, entry],
          redoStack: redoStack.slice(0, -1),
          hasPendingChanges: false,
        }
        notify()
        return entry
      },
      clear: () => {
        stateRef.current = {
          undoStack: [],
          redoStack: [],
          hasPendingChanges: false,
        }
        notify()
      },
      // The early-return guards against redundant state mutations, so a single
      // synchronous `notify()` call is sufficient — no `queueMicrotask` needed.
      setPendingChanges: value => {
        if (stateRef.current.hasPendingChanges === value) return
        stateRef.current = { ...stateRef.current, hasPendingChanges: value }
        notify()
      },
    }
  }).current

  const canUndo = useStore(store, selectCanUndo)
  const canRedo = useStore(store, selectCanRedo)

  const onCommit = React.useCallback(() => {
    const pending = pendingBatchRef.current
    if (pending.byKey.size === 0) return

    if (pending.timeoutId) {
      clearTimeout(pending.timeoutId)
      pending.timeoutId = null
    }

    const updates = Array.from(pending.byKey.values())
    pending.byKey.clear()

    const { getRowId: getId } = propsRef.current

    store.push({
      variant: 'cells_update',
      count: updates.length,
      timestamp: Date.now(),
      undo: currentData => {
        const newData = [...currentData]
        const indexById = buildIndexById(newData, getId)
        for (const update of updates) {
          const index = indexById.get(update.rowId)
          if (index !== undefined) {
            const row = newData[index]
            if (row)
              newData[index] = {
                ...row,
                [update.columnId]: update.previousValue,
              }
          }
        }
        return newData
      },
      redo: currentData => {
        const newData = [...currentData]
        const indexById = buildIndexById(newData, getId)
        for (const update of updates) {
          const index = indexById.get(update.rowId)
          if (index !== undefined) {
            const row = newData[index]
            if (row)
              newData[index] = { ...row, [update.columnId]: update.newValue }
          }
        }
        return newData
      },
    })
  }, [store, propsRef])

  const onUndo = React.useCallback(() => {
    if (!propsRef.current.enabled) return
    onCommit()
    const entry = store.undo()
    if (!entry) {
      toast.info('No actions to undo')
      return
    }
    propsRef.current.onDataChange(entry.undo(propsRef.current.data))
    toast.success(`${formatActionCount(entry.count)} undone`)
  }, [store, propsRef, onCommit])

  const onRedo = React.useCallback(() => {
    if (!propsRef.current.enabled) return
    onCommit()
    const entry = store.redo()
    if (!entry) {
      toast.info('No actions to redo')
      return
    }
    propsRef.current.onDataChange(entry.redo(propsRef.current.data))
    toast.success(`${formatActionCount(entry.count)} redone`)
  }, [store, propsRef, onCommit])

  const onClear = React.useCallback(() => {
    const pending = pendingBatchRef.current
    if (pending.timeoutId) {
      clearTimeout(pending.timeoutId)
      pending.timeoutId = null
    }
    pending.byKey.clear()
    store.clear()
  }, [store])

  const trackCellsUpdate = React.useCallback(
    (updates: UndoRedoCellUpdate[]) => {
      if (!propsRef.current.enabled || updates.length === 0) return

      const filteredUpdates = updates.filter(
        u => !Object.is(u.previousValue, u.newValue)
      )
      if (filteredUpdates.length === 0) return

      const pending = pendingBatchRef.current

      for (const update of filteredUpdates) {
        const key = getPendingKey(update.rowId, update.columnId)
        const existing = pending.byKey.get(key)
        pending.byKey.set(
          key,
          existing ? { ...existing, newValue: update.newValue } : update
        )
      }

      store.setPendingChanges(true)

      if (pending.timeoutId) clearTimeout(pending.timeoutId)
      pending.timeoutId = setTimeout(onCommit, BATCH_TIMEOUT)
    },
    [store, propsRef, onCommit]
  )

  const trackRowsAdd = React.useCallback(
    (rows: TData[]) => {
      if (!propsRef.current.enabled || rows.length === 0) return

      onCommit()

      const { getRowId: getId } = propsRef.current
      const rowIds = new Set(rows.map(row => getId(row)))
      const rowsCopy = rows.map(row => ({ ...row }))

      store.push({
        variant: 'rows_add',
        count: rows.length,
        timestamp: Date.now(),
        undo: currentData => currentData.filter(row => !rowIds.has(getId(row))),
        redo: currentData => [
          ...currentData,
          ...rowsCopy.map(row => ({ ...row })),
        ],
      })
    },
    [store, propsRef, onCommit]
  )

  const trackRowsDelete = React.useCallback(
    (rows: TData[]) => {
      if (!propsRef.current.enabled || rows.length === 0) return

      onCommit()

      const { getRowId: getId, data: currentData } = propsRef.current
      const indexById = buildIndexById(currentData, getId)

      const rowsWithPositions: Array<{ index: number; row: TData }> = []
      for (const row of rows) {
        const index = indexById.get(getId(row))
        if (index !== undefined)
          rowsWithPositions.push({ index, row: { ...row } })
      }
      rowsWithPositions.sort((a, b) => a.index - b.index)

      const rowIds = new Set(rows.map(row => getId(row)))

      store.push({
        variant: 'rows_delete',
        count: rows.length,
        timestamp: Date.now(),
        undo: currentData => {
          const newData = [...currentData]
          for (const { index, row } of rowsWithPositions) {
            newData.splice(Math.min(index, newData.length), 0, { ...row })
          }
          return newData
        },
        redo: currentData => currentData.filter(row => !rowIds.has(getId(row))),
      })
    },
    [store, propsRef, onCommit]
  )

  React.useEffect(() => {
    const pending = pendingBatchRef.current
    return () => {
      if (pending.timeoutId) clearTimeout(pending.timeoutId)
    }
  }, [])

  React.useEffect(() => {
    if (!enabled) return

    const onKeyDown = (event: KeyboardEvent) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey
      const key = event.key.toLowerCase()

      if (!isCtrlOrCmd || (key !== 'z' && key !== 'y')) return

      const { activeElement } = document
      if (activeElement) {
        const isInput =
          activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA'
        const isContentEditable =
          activeElement.getAttribute('contenteditable') === 'true'
        if (isInput || isContentEditable || getIsInPopover(activeElement))
          return
      }

      event.preventDefault()

      if (key === 'z' && !event.shiftKey) {
        onUndo()
      } else if (key === 'y' || event.shiftKey) {
        onRedo()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [enabled, onUndo, onRedo])

  return React.useMemo(
    () => ({
      canUndo,
      canRedo,
      onUndo,
      onRedo,
      onClear,
      trackCellsUpdate,
      trackRowsAdd,
      trackRowsDelete,
    }),
    [
      canUndo,
      canRedo,
      onUndo,
      onRedo,
      onClear,
      trackCellsUpdate,
      trackRowsAdd,
      trackRowsDelete,
    ]
  )
}

export {
  useDataGridUndoRedo,
  //
  type UndoRedoCellUpdate,
}
