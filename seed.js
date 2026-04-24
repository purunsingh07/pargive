require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');
const { pgTable, serial, text, boolean, jsonb } = require('drizzle-orm/pg-core');

// Minimal schema for seeding
const charities = pgTable("charities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  isFeatured: boolean("is_featured").default(false),
});

async function seed() {
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

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

  console.log("Seeding charities...");
  await db.insert(charities).values(data);
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
