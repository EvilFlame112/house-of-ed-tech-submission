export const config = {
  matcher: ['/dashboard/:path*'],
};

export function middleware(request: Request) {
  const url = new URL(request.url);
  const cookies = request.headers.get('cookie') || '';
  const hasSession = cookies.includes('next-auth.session-token') || 
                     cookies.includes('__Secure-next-auth.session-token');

  if (!hasSession) {
    return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(url.pathname)}`, request.url));
  }
}

