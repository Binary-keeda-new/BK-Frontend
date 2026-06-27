import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('DS')

  if (!token && request.nextUrl.pathname.startsWith('/user')) {
    const publicUserRoutes = [
      '/user/events',
      '/user/counselling',
      '/user/tech-shop',
    ];
    
    const isPublic = publicUserRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    );
    
    if (!isPublic) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*', '/dashboard/:path*', '/admin/:path*'],
}