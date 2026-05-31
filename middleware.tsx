import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token");

  const isLoginPage = req.nextUrl.pathname === "/login";

  if (!token && !isLoginPage)
    return NextResponse.redirect(new URL("/login", req.url));
  if (token && isLoginPage) return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
