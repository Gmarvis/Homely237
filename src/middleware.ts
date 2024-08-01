import { NextResponse } from 'next/server';

import { NextRequest } from 'next/server';

export default function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('token');

  const protectedRoute = ['/dashboard'];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoute.includes(currentPath);
  if (!token && isProtectedRoute) {
    // return NextResponse.redirect("http://localhost:3000/auth")
  }

  return NextResponse.next();
}
