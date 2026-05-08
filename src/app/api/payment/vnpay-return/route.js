import { NextResponse } from "next/server";

export async function GET(request) {
  const incomingUrl = new URL(request.url);
  const redirectUrl = new URL(
    `/page/payment/return${incomingUrl.search}`,
    request.url,
  );

  return NextResponse.redirect(redirectUrl);
}
