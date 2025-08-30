import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);

  // Allow the login page at /admin without session
  if (pathname === "/admin") return NextResponse.next();

  const session = await getSessionCookie(req);
  if (!session) return NextResponse.redirect(new URL("/admin", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
