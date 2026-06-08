import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Allow the not-found page itself to render (avoid infinite loop)
  if (pathname === "/not-found") {
    return NextResponse.next();
  }

  // Allow Next.js internal assets (CSS, JS, images, fonts, etc.)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/logo.png") ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect EVERYTHING else to the not-found page
  return NextResponse.rewrite(new URL("/not-found", request.url));
}

export const config = {
  matcher: "/((?!_next|api|favicon.ico|logo.png).*)",
};
