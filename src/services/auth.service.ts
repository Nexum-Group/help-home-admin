import { apiFetch } from '../lib/api';

export function login(data: { email: string; password: string }) {
  return apiFetch('/login/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function logout() {
  return apiFetch('/user/logout/', {
    method: 'POST',
  });
}

export function getCurrentUser() {
  return apiFetch('/user/whoami/', {
    method: 'GET',
  });
}
