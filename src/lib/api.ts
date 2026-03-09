export async function apiFetch(url: string, options?: RequestInit, retry = true) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  });

  if (response.status === 401 && retry) {
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      return apiFetch(url, options, false);
    }

    window.location.href = '/login';
    throw new Error('Sessão expirada');
  }
  if (!response.ok) {
    throw new Error('Erro na requisição');
  }

  return response.json();
}
