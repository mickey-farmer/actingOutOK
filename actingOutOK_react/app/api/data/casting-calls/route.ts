import { NextResponse } from "next/server";
import { getCastingCallsList } from "@/lib/data-source";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0, private",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET() {
  try {
    const { data, source } = await getCastingCallsList();
    return NextResponse.json(data, {
      headers: {
        ...NO_CACHE_HEADERS,
        "X-Data-Source": source,
        "X-List-Count": String(data.length),
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load casting calls";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
