import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getMessages } from "@/lib/api";

export const revalidate = 60;

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(50),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const parsed = querySchema.safeParse({ limit: searchParams.get("limit") });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const messages = await getMessages(parsed.data.limit);
  return NextResponse.json({ messages });
}
