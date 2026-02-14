import {z} from "zod";
import { integer, pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";
import { relations } from 'drizzle-orm';

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
}, (table) => {
  return {
    userIdIdx: index("accounts_user_id_idx").on(table.userId),
  };
});

export const accountsRelations = relations(accounts, ({many}) => ({
  transactions: many(transactions),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
}, (table) => {
  return {
    userIdIdx: index("categories_user_id_idx").on(table.userId),
  };
});

export const categoriesRelations  = relations(categories, ({many}) => ({
  transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date", { mode: "date" }).notNull(),
  accountId: text("account_id").references(() => accounts.id, {
    onDelete: "cascade",
  }).notNull(),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
}, (table) => {
  return {
    dateIdx: index("transactions_date_idx").on(table.date),
    accountIdIdx: index("transactions_account_id_idx").on(table.accountId),
    categoryIdIdx: index("transactions_category_id_idx").on(table.categoryId),
  };
});

export const transactionsRelations  = relations(transactions, ({one}) => ({
  account: one(accounts,{
    fields: [transactions.accountId],
    references: [accounts.id]
  }),
  categories: one(categories,{
    fields: [transactions.categoryId],
    references: [categories.id]
  }),
}));

export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
})