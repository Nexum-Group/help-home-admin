import { apiFetch } from '../lib/api';

export function dashboard() {
  return apiFetch('/user/dashboard/', {
    method: 'GET',
  });
}
