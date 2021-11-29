import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  // Allow the requests if the following conditions are met
  // 1. It's a request for next-auth session & provider fetching or
  // 2. The token exists

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect to login page if the following conditions are met
  // 1. They don't have a token and
  // 2. Requesting a protected route

  if (!token && pathname !== "/auth/signin") {
    return NextResponse.redirect("/auth/signin");
  }
}
