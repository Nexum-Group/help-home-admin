// src/hooks/useDashboard.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../services/category.service';
import { CategoryItem, CategoryOptions } from '../types/categories';
import { Category, CategoryCreateAndUpdate } from '../types/category';

export function useCategories() {
  return useQuery<CategoryOptions[] | CategoryItem[]>({
    queryKey: ['categories-options'],
    queryFn: getAllCategories,
  });
}

export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,
  });
}

interface IUpdateCategoryParams {
  categoryUuid: string;
  data: CategoryCreateAndUpdate;
}
export function useUpdateCategory() {
  return useMutation({
    mutationFn: ({ categoryUuid, data }: IUpdateCategoryParams) =>
      updateCategory(data, categoryUuid),
  });
}

export function useCategory(categoryUuid: string) {
  return useQuery<Category>({
    queryKey: ['category', categoryUuid],
    queryFn: () => getCategory(categoryUuid),
  });
}
