import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('access_token', data.access, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });

  response.cookies.set('refresh_token', data.refresh, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
