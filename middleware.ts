import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("hello");
  const pathName = request.nextUrl.pathname;
  if (pathName === "/") {
    const response = NextResponse.next();
    response.cookies.set("middleware-cookie", "hello");
    return response;
  }
  if (pathName === "/profile") {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/profile", "/create-account", "/user/:path*"],
};
