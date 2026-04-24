import { db } from "@/db";
import { charities, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const allCharities = await db.query.charities.findMany();
    return NextResponse.json({ charities: allCharities });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId, charityId, percentage } = await req.json();

    if (percentage < 10) {
      return NextResponse.json({ error: "Minimum contribution is 10%" }, { status: 400 });
    }

    const updated = await db
      .update(users)
      .set({
        charityId,
        charityPercentage: percentage,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return NextResponse.json({ user: updated[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
