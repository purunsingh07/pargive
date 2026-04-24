require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');
const { pgTable, text, boolean } = require('drizzle-orm/pg-core');
const { eq } = require('drizzle-orm');

// Minimal schema for promotion
const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

async function makeAdmin() {
  const email = process.argv[2];
  if (!email) {
    console.error("Please provide an email: node make-admin.js user@example.com");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log(`Promoting ${email} to admin...`);
  
  const result = await db
    .update(users)
    .set({ isAdmin: true })
    .where(eq(users.email, email))
    .returning();

  if (result.length > 0) {
    console.log("Success! User is now an admin.");
  } else {
    console.log("User not found. Make sure they have logged in at least once so their profile exists in the database.");
  }
  process.exit(0);
}

makeAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});
