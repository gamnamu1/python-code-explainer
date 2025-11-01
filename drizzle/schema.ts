import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * 파이썬 코드 분석 이력 테이블
 * 사용자가 입력한 코드와 생성된 설명을 저장합니다.
 */
export const codeAnalyses = mysqlTable("code_analyses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  code: text("code").notNull(),
  fileName: varchar("fileName", { length: 255 }),
  elementaryExplanation: text("elementaryExplanation"),
  collegeExplanation: text("collegeExplanation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CodeAnalysis = typeof codeAnalyses.$inferSelect;
export type InsertCodeAnalysis = typeof codeAnalyses.$inferInsert;