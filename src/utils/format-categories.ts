import { Category } from '../types/category';

export function formatCategories(categories: Category[]) {
  return categories.map((cat) => cat.name).join(', ');
}
