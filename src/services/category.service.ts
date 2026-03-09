import { apiFetch } from '../lib/api';
import { CategoryCreateAndUpdate } from '../types/category';

export function getAllCategories() {
  return apiFetch(`/category/list/`, {
    method: 'GET',
  });
}

export function createCategory(data: CategoryCreateAndUpdate) {
  return apiFetch(`/category/create/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateCategory(data: CategoryCreateAndUpdate, categoryUuid: string) {
  return apiFetch(`/category/update/${categoryUuid}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function getCategory(categoryUuid: string) {
  return apiFetch(`/category/detail/${categoryUuid}/`, {
    method: 'GET',
  });
}
