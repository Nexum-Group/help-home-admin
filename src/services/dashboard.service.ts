import { apiFetch } from '../lib/api';

export function dashboard() {
  return apiFetch('/users/me/dashboard/', {
    method: 'GET',
  });
}
