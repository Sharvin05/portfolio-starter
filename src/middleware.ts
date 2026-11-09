import { NextResponse, type NextRequest } from "next/server";
import { COUNTRY_COOKIE } from "@/lib/consent";

/** Passes the visitor's country (from Vercel's or Cloudflare's IP header) to the browser, so it knows whether to ask for consent. */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const country = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry");
  if (country && request.cookies.get(COUNTRY_COOKIE)?.value !== country) {
    response.cookies.set(COUNTRY_COOKIE, country, { path: "/", sameSite: "lax", secure: request.nextUrl.protocol === "https:" });
  }
  return response;
}

// Pages only: skip API routes, Next's own files and anything with a file extension.
export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
