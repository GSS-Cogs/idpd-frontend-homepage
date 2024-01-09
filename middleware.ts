import { NextResponse } from "next/server";
import absoluteUrl from "next-absolute-url";
import { IncomingMessage } from "http";

export function middleware(request: Request) {
  const { origin } = absoluteUrl(request as unknown as IncomingMessage); // Rename variable to avoid redeclaration

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", origin);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
