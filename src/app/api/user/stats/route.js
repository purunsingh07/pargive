import { db } from "@/db";
import { scores, users, draws } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Get total scores sum
    const scoreStats = await db
      .select({ 
        total: sql`sum(${scores.score})`,
        count: sql`count(${scores.id})`,
        avg: sql`avg(${scores.score})`
      })
      .from(scores)
      .where(eq(scores.userId, userId));

    // Get active draw (most recent published or pending)
    const activeDraw = await db.query.draws.findFirst({
        orderBy: (draws, { desc }) => [desc(draws.month)]
    });

    return NextResponse.json({ 
      totalScore: scoreStats[0]?.total || 0,
      roundCount: scoreStats[0]?.count || 0,
      avgScore: parseFloat(scoreStats[0]?.avg || 0).toFixed(1),
      activeDrawMonth: activeDraw?.month || "No active draw",
      activeDrawPool: activeDraw?.totalPrizePool || "TBD"
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
