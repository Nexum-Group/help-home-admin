import { apiFetch } from '../lib/api';
import { CategoryCreateAndUpdate } from '../types/category';

export function getAllCategories() {
  return apiFetch(`/category/`, {
    method: 'GET',
  });
}

export function createCategory(data: CategoryCreateAndUpdate) {
  return apiFetch(`/category/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateCategory(data: CategoryCreateAndUpdate, categoryUuid: string) {
  return apiFetch(`/category/${categoryUuid}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function getCategory(categoryUuid: string) {
  return apiFetch(`/category/${categoryUuid}/`, {
    method: 'GET',
  });
}
