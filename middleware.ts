import { NextResponse } from "next/server";
import absoluteUrl from "next-absolute-url";
import { IncomingMessage } from "http";

export function middleware(request: IncomingMessage) {
  const { origin } = absoluteUrl(request);

  const requestHeaders = new Headers(request.headers as HeadersInit);
  requestHeaders.set("x-url", origin);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
