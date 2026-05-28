import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '100';
  const offset = searchParams.get('offset') || '0';

  try {
    const response = await fetch(`${API_URL}/api/scores?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch scores' }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to connect to API' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${API_URL}/api/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: 'Failed to connect to API' }, { status: 503 });
  }
}
