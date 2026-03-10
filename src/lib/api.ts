export async function apiFetch(url: string, options?: RequestInit) {
  const response = await fetch(`/api/proxy${url}`, {
    ...options,
  });

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  return response.json();
}