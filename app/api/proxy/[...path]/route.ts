import { NextRequest, NextResponse } from 'next/server';

async function handleRequest(
  method: string,
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;

  const access = req.cookies.get('access_token')?.value;
  const searchParams = req.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';
  const pathString = path.join('/');

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${pathString}${queryString}`;

  const fetchOptions: RequestInit = {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET' && method !== 'HEAD') {
    fetchOptions.method = method;
    fetchOptions.body = await req.text();
  }

  const response = await fetch(url, fetchOptions);

  const contentType = response.headers.get('content-type') || '';
  let data;

  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    return NextResponse.json(
      { error: text || 'Erro na requisição' },
      { status: response.status }
    );
  }

  return NextResponse.json(data, { status: response.status });
}

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleRequest('GET', req, context);
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleRequest('POST', req, context);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleRequest('PUT', req, context);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleRequest('PATCH', req, context);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleRequest('DELETE', req, context);
}
