// src/app/api/current-track/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
  }
  const accessToken = authHeader.split(' ')[1];

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // If nothing is playing, Spotify returns a 204 status.
    if (response.status === 204) {
      return NextResponse.json({ message: 'No track currently playing' }, { status: 204 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching current track:', error);
    return NextResponse.json({ error: 'Error fetching current track' }, { status: 500 });
  }
}

// Optionally, handle OPTIONS for CORS
export function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200 });
}
