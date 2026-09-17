import type { Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'sonner'

type ErrorResponseApi = {
  status: number
  data: {
    errors: {
      message: string
      code: string
    }[]
  }
}
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => next => action => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const err = action as PayloadAction<
        ErrorResponseApi,
        string,
        {
          arg: unknown
          requestId: string
          requestStatus: 'rejected'
          aborted: boolean
          condition: boolean
        } & (
          | { rejectedWithValue: true }
          | ({ rejectedWithValue: false } & { error: ErrorResponseApi })
        ),
        {
          message: string
        }
      >
      console.warn('We got a rejected action!', err.payload)
      if (err.payload.status === 403) {
        return next(action)
      }
      if ('data' in err.payload) {
        err.payload.data.errors.forEach(error => {
          toast.error(error.message)
        })
      } else {
        toast.error(err.error.message)
      }
      return next(action)
    }

    return next(action)
  }
