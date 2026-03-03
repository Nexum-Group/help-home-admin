// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "../services/category.service"
import { CategoryOptions } from "../types/categories"

export function useCategoriesOption() {
  return useQuery<CategoryOptions[]>({
    queryKey: ["categories-options"],
    queryFn: getAllCategories,
  })
}
