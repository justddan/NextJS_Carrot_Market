import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import db from "./lib/db";

export async function middleware(request: NextRequest) {
  await db.user.findMany({});
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
