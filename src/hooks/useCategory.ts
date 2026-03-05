// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "../services/category.service"
import { CategoryItem, CategoryOptions } from "../types/categories"

export function useCategories() {
  return useQuery<CategoryOptions[] | CategoryItem[]>({
    queryKey: ["categories-options"],
    queryFn: getAllCategories,
  })
}
