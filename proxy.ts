import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const pathname = request.nextUrl.pathname;
  
  // não logado tentando acessar admin
  if (!accessToken && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!accessToken) {
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, secret);
      const isAdmin = payload.is_admin;

      // admin tentando acessar login
      if (isAdmin && pathname === '/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      // usuário normal tentando acessar admin
      if (pathname.startsWith('/admin') && !isAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
