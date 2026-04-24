import { db } from "@/db";
import { draws } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allDraws = await db.query.draws.findMany({
      orderBy: [desc(draws.month)],
    });
    return NextResponse.json({ draws: allDraws });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
