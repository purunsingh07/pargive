import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, displayName } = await req.json();

    if (!userId || !displayName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await db
      .update(users)
      .set({ displayName, updatedAt: sql`now()` })
      .where(eq(users.id, userId))
      .returning();

    return NextResponse.json({ user: updated[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
