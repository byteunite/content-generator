import { internalMutation } from "./_generated/server";
import schema from "./schema";

export const reset = internalMutation({
  handler: async (ctx) => {
    console.log("Resetting database...");
    const tables = Object.keys(schema.tables) as (keyof typeof schema.tables)[];
    console.log("Tables to clear:", tables);
    for (const table of tables) {
      console.log(`Clearing table: ${table}`);
      const rows = await ctx.db.query(table).collect();
      console.log(`Found ${rows.length} rows in table ${table}`);
      console.log(rows);
      const deletePromises = rows.map((row) => ctx.db.delete(row._id));
      await Promise.all(deletePromises);
    }

    console.log("Clearing storage...");
    const rows = await ctx.db.system.query("_storage").collect()
    console.log(`Found ${rows.length} rows in table _storage`);
    console.log(rows)
    for (const row of rows) {
      console.log(`Deleting storage item: ${row._id}`);
      await ctx.storage.delete(row._id);
    }

    console.log("Database reset complete.");
  },
});