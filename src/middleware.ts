import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const orgId: any = request.nextUrl.searchParams.get('orgId') || request.cookies.get('orgId')?.value
  if (orgId) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('organization-id', orgId as string)
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    })
    if (request.nextUrl.searchParams.get('orgId')) {
      response.cookies.set('orgId', orgId as string)
    }
    return response
  }

  return NextResponse.redirect(new URL('/organizations', request.url))
}

export const config = {
  matcher: [
    {
      source: '/'
    },
  ],
}