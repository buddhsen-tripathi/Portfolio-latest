import { NextResponse } from "next/server";

export async function GET(request) {
  const city = request.headers.get("x-vercel-ip-city") || "";
  const region = request.headers.get("x-vercel-ip-country-region") || "";
  const countryName = request.headers.get("x-vercel-ip-country") || "";

  return NextResponse.json({
    city: decodeURIComponent(city),
    country: countryName,
    region: region,
  });
}
