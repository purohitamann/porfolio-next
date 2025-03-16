import { NextResponse } from 'next/server';

export function middleware(req: any) {
    const res = NextResponse.next();

    res.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; connect-src 'self' https://api.github.com;"
    );

    return res;
}
