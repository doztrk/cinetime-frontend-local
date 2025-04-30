import { NextResponse } from "next/server";
import { getCookie } from "@/helpers/server";
import { me } from "@/services/auth-service";

const protectedRoutePatterns = [
  /^\/movies\//,
  /^\/admin\//,
  /^\/profile\//,
  /^\/settings\//,
  /^\/dashboard\//,
];

export const middleware = async (req) => {
  const authToken = (await getCookie("authToken")) || null;
  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutePatterns.some((pattern) =>
    pattern.test(pathname)
  );

  if (isProtectedRoute) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      const meReq = await me(authToken);
      const res = await meReq.json();
      if (!res.error) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", req.url));
    } catch (err) {
      console.error("Middleware auth check error:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
