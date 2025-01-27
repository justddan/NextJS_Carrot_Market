import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/") {
    const response = NextResponse.next();
    response.cookies.set("middleware-cookie", "hello");
  }
  if (request.nextUrl.pathname === "/profile") {
    return Response.redirect(new URL("/", request.url));
  }
}
