import { db } from "@/db";
import { winners, users, draws } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allWinners = await db
      .select({
        id: winners.id,
        userName: users.displayName,
        userEmail: users.email,
        matchType: winners.matchType,
        amount: winners.amount,
        status: winners.status,
        date: winners.createdAt,
      })
      .from(winners)
      .innerJoin(users, eq(winners.userId, users.id))
      .orderBy(desc(winners.createdAt));

    return NextResponse.json({ winners: allWinners });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
