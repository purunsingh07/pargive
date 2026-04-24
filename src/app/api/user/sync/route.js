import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Sync API Request Body:", body);
    const { uid, email, displayName, photoUrl } = body;

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, uid),
    });

    const userCountResult = await db.select({ count: users.id }).from(users).limit(1);
    const shouldBeAdmin = userCountResult.length === 0;

    if (existingUser) {
      // Update existing user
      const updatedUser = await db
        .update(users)
        .set({
          email,
          displayName: displayName || existingUser.displayName,
          photoUrl: photoUrl || existingUser.photoUrl,
          updatedAt: sql`now()`,
        })
        .where(eq(users.id, uid))
        .returning();
      
      return NextResponse.json({ user: updatedUser[0] });
    } else {
      // Create new user
      const newUser = await db
        .insert(users)
        .values({
          id: uid,
          email,
          displayName: displayName || "Golfer",
          photoUrl,
          isAdmin: shouldBeAdmin
        })
        .returning();

      return NextResponse.json({ user: newUser[0] });
    }
  } catch (error) {
    console.error("Sync API Error Details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
