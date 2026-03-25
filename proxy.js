/**
 * Next.js Middleware — Route Protection
 * Uses @supabase/ssr to validate the session server-side via cookies.
 * No demo mode — all protected routes require a real Supabase session.
 *
 * Protected: /welcome /select-gender /select-business /story /rules /game
 * Public:    /login (and all Next.js internals)
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const PROTECTED = [
  "/welcome",
  "/select-gender",
  "/select-business",
  "/story",
  "/rules",
  "/game",
  "/profile",
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only run on protected routes
  const isProtected = PROTECTED.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  // Build a response object we can attach cookie mutations to
  let response = NextResponse.next({ request });

  // Create a Supabase server client that reads/writes cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write any refreshed cookies back to both request and response
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getUser() is the secure server-side check — never use getSession() in middleware
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No valid user → redirect to /login, preserving intended destination
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all routes EXCEPT Next.js internals and static files.
     * The negative lookahead excludes _next, favicon, and public assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
