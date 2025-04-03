interface Filter {
  [key: string]: string[]
}

export const useCategoryStore = defineStore('category', () => {
  const filter = reactive<Filter>({
    color: [],
    category: [],
    size: [],
    sort: [],
  })
  return {
    filter,
  }
})
