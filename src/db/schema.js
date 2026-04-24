import { pgTable, serial, text, timestamp, integer, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Firebase UID
  email: text("email").notNull(),
  displayName: text("display_name"),
  photoUrl: text("photo_url"),
  subscriptionStatus: text("subscription_status").default("inactive"), // inactive, monthly, yearly
  renewalDate: timestamp("renewal_date"),
  charityId: integer("charity_id").references(() => charities.id),
  charityPercentage: integer("charity_percentage").default(10),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const scores = pgTable("scores", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  score: integer("score").notNull(), // Stableford 1-45
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const charities = pgTable("charities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  events: jsonb("events"), // Upcoming events
  website: text("website"),
  isFeatured: boolean("is_featured").default(false),
});

export const draws = pgTable("draws", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  winningNumbers: jsonb("winning_numbers"), 
  status: text("status").default("pending"), 
  totalPrizePool: text("total_prize_pool"),
  jackpotRollover: text("jackpot_rollover").default("0"),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const winners = pgTable("winners", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  drawId: integer("draw_id").references(() => draws.id).notNull(),
  matchType: integer("match_type").notNull(), 
  proofUrl: text("proof_url"),
  status: text("status").default("pending"), 
  amount: text("amount"),
  createdAt: timestamp("created_at").default(sql`now()`),
});
