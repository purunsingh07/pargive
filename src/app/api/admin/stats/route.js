import { db } from "@/db";
import { users, scores, draws, winners } from "@/db/schema";
import { sql, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userCount = await db.select({ count: sql`count(*)` }).from(users);
    const scoreCount = await db.select({ count: sql`count(*)` }).from(scores);
    const pendingWinners = await db.select({ count: sql`count(*)` }).from(winners).where(eq(winners.status, 'pending'));
    
    const totalPrizePool = await db.select({ sum: sql`sum(${draws.totalPrizePool})` }).from(draws);

    return NextResponse.json({ 
      totalUsers: userCount[0].count,
      totalScores: scoreCount[0].count,
      pendingVerifications: pendingWinners[0].count,
      totalPrizePool: totalPrizePool[0].sum || 0
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
