import { db } from "@/db";
import { users, scores, draws, winners } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Generate 5 unique random winning numbers (1-45)
    const winningNumbers = [];
    while (winningNumbers.length < 5) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!winningNumbers.includes(num)) winningNumbers.push(num);
    }

    // 2. Get active draw or create one
    let activeDraw = await db.query.draws.findFirst({
      where: eq(draws.status, 'pending'),
    });

    if (!activeDraw) {
      // Create a default draw for the current month if none exists
      const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      const newDraw = await db.insert(draws).values({
        month,
        totalPrizePool: "10000",
        status: 'pending',
      }).returning();
      activeDraw = newDraw[0];
    }

    // 3. Find all users and their scores
    const allScores = await db.select().from(scores);
    
    // Group scores by user
    const userScores = allScores.reduce((acc, score) => {
      if (!acc[score.userId]) acc[score.userId] = [];
      acc[score.userId].push(score.score);
      return acc;
    }, {});

    const matchesFound = [];

    // 4. Check for matches
    for (const userId in userScores) {
      const scoresArr = userScores[userId];
      const matchCount = scoresArr.filter(s => winningNumbers.includes(s)).length;

      if (matchCount >= 3) {
        // Calculate prize based on match count (very simplified)
        let amount = 0;
        if (matchCount === 5) amount = parseFloat(activeDraw.totalPrizePool) * 0.40;
        if (matchCount === 4) amount = parseFloat(activeDraw.totalPrizePool) * 0.35;
        if (matchCount === 3) amount = parseFloat(activeDraw.totalPrizePool) * 0.25;

        matchesFound.push({
          userId,
          drawId: activeDraw.id,
          matchType: matchCount,
          amount: amount.toString(),
          status: 'pending',
        });
      }
    }

    // 5. Insert winners
    if (matchesFound.length > 0) {
      await db.insert(winners).values(matchesFound);
    }

    // 6. Update draw status to published
    await db.update(draws)
      .set({ 
        status: 'published',
        winningNumbers: winningNumbers,
        updatedAt: sql`now()`
      })
      .where(eq(draws.id, activeDraw.id));

    return NextResponse.json({ 
      success: true, 
      winningNumbers, 
      winnersFound: matchesFound.length 
    });
  } catch (error) {
    console.error("Simulation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
