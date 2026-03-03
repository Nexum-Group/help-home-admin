import { apiFetch } from "../lib/api";

export function getAllCategories() {
    return apiFetch(`/category/categories/list/`, {
        method: 'GET',
    })
}
