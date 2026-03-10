import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;

  const access = req.cookies.get("access_token")?.value;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path.join("/")}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}