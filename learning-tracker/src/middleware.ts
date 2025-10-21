export const config = {
  matcher: ['/dashboard/:path*'],
};

export function middleware(request: Request) {
  const url = new URL(request.url);
  const cookies = request.headers.get('cookie') || '';
  
  // Check for NextAuth session token (both HTTP and HTTPS variants)
  const hasSession = cookies.includes('next-auth.session-token=') || 
                     cookies.includes('__Secure-next-auth.session-token=');

  if (!hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', url.pathname);
    return Response.redirect(loginUrl);
  }
  
  // Continue to the requested page if session exists
  return undefined;
}

