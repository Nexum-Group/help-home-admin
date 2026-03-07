import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')
  const refreshToken = request.cookies.get('refresh_token')

  const isAuthenticated = !!accessToken
  const hasRefresh = !!refreshToken

  // Se não tem nenhum token
  if (!isAuthenticated && !hasRefresh && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se já autenticado e tentar ir para login
  if (isAuthenticated && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/users', '/providers', '/requests', '/settings', '/reports'],
}