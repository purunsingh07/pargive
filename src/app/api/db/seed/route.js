import { db } from "@/db";
import { charities } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = [
      {
        name: "Ocean CleanUp",
        description: "Removing plastics from the world's oceans through innovative technology.",
        imageUrl: "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?auto=format&fit=crop&q=80&w=800",
        isFeatured: true,
      },
      {
        name: "Golf for Good",
        description: "Introducing underprivileged youth to the game of golf and its values.",
        imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800",
        isFeatured: false,
      },
      {
        name: "Trees for Life",
        description: "Restoring the wild forest of the Scottish Highlands.",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
        isFeatured: false,
      },
    ];

    await db.insert(charities).values(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
