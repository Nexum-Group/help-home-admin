import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')

  const isAuthenticated = !!accessToken

  // Se não autenticado e tentar acessar home
  if (!isAuthenticated && request.nextUrl.pathname === '/') {
    console.log('Usuário não autenticado, redirecionando para login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se autenticado e tentar acessar login
  if (isAuthenticated && request.nextUrl.pathname === '/login') {
    console.log('Usuário já autenticado, redirecionando para home')
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login']
}