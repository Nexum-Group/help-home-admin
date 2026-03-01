export async function apiFetch(
  url: string,
  options?: RequestInit
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Erro na requisição')
  }

  return response.json()
}