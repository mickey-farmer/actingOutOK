import { NextRequest, NextResponse } from "next/server";

/**
 * Placeholder API for server-side IMDb lookups.
 * Example: GET /api/imdb?name=nm1234567
 * Later: call IMDb (or a permitted API), return name, photo, credits, etc.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nameId = searchParams.get("name"); // e.g. nm1234567

  if (!nameId) {
    return NextResponse.json(
      { error: "Missing query parameter: name (e.g. nm1234567)" },
      { status: 400 }
    );
  }

  // TODO: Add server-side IMDb fetch when you have an API key or permitted scraper.
  // For now return a placeholder so the route exists and can be extended.
  return NextResponse.json({
    ok: true,
    message: "IMDb API placeholder — add your server-side lookup here",
    nameId,
  });
}
