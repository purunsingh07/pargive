import { db } from "@/db";
import { scores } from "@/db/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const userScores = await db.query.scores.findMany({
      where: eq(scores.userId, userId),
      orderBy: [desc(scores.date)],
      limit: 5,
    });
    return NextResponse.json({ scores: userScores });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId, score, date } = await req.json();

    if (score < 1 || score > 45) {
      return NextResponse.json({ error: "Score must be between 1 and 45" }, { status: 400 });
    }

    // Check how many scores the user has
    const userScores = await db.query.scores.findMany({
      where: eq(scores.userId, userId),
      orderBy: [asc(scores.date)],
    });

    if (userScores.length >= 5) {
      // Find the oldest score
      const oldestScore = userScores[0];
      // Replace it
      const updated = await db
        .update(scores)
        .set({
          score,
          date: date ? new Date(date) : sql`now()`,
          createdAt: sql`now()`,
        })
        .where(eq(scores.id, oldestScore.id))
        .returning();
      
      return NextResponse.json({ score: updated[0] });
    } else {
      // Insert new score
      const inserted = await db
        .insert(scores)
        .values({
          userId,
          score,
          date: date ? new Date(date) : sql`now()`,
        })
        .returning();
      
      return NextResponse.json({ score: inserted[0] });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
