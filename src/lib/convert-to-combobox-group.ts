export function convertToComboboxGroup<T>(data: T[], keyFieldGroup: keyof T) {
  return {
    data: Object.values(
      data.reduce<
        Record<
          string,
          {
            value: string
            items: (typeof data)[number][]
          }
        >
      >((acc, item) => {
        const key = item[keyFieldGroup] as string
        if (!acc[key]) {
          acc[key] = { value: key, items: [] }
        }
        acc[key].items.push(item)
        return acc
      }, {})
    ),
  }
}
