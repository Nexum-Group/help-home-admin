import { apiFetch } from '../lib/api';
import { CategoryCreateAndUpdate } from '../types/category';

export function getAllCategories() {
  return apiFetch(`/categories/`, {
    method: 'GET',
  });
}

export function createCategory(data: CategoryCreateAndUpdate) {
  return apiFetch(`/categories/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateCategory(data: CategoryCreateAndUpdate, categoryUuid: string) {
  return apiFetch(`/categories/${categoryUuid}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function getCategory(categoryUuid: string) {
  return apiFetch(`/categories/${categoryUuid}/`, {
    method: 'GET',
  });
}
