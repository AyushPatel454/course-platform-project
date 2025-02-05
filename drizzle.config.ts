// Import necessary functions or modules (e.g., `defineConfig` from Drizzle Kit)
import { env } from "@/data/env/server";
import { defineConfig } from 'drizzle-kit';

// Export the configuration object using `defineConfig`
export default defineConfig({
  /**
   * Specify the directory where migration files will be generated.
   * Migrations are SQL files that track changes to your database schema over time.
   */
  out: "./src/drizzle/migrations",

  /**
   * Path to your schema definition file.
   * This file (`schema.ts`) contains the structure of your database tables, relationships, and types.
   * Drizzle uses this to generate migrations and enforce type safety.
   */
  schema: "./src/drizzle/schema.ts",

  /**
   * Specify the database dialect you're using.
   * In this case, it's PostgreSQL. Drizzle will generate PostgreSQL-specific SQL commands.
   * Other options could include `mysql`, `sqlite`, etc., depending on your database.
   */
  dialect: "postgresql",

  /**
   * Enable strict mode for schema validation.
   * This ensures that your schema definitions are type-safe and consistent.
   * It helps catch potential errors during development, such as missing or incorrect fields.
   */
  strict: true,
  
  /**
   * Enable verbose logging during migrations.
   * This provides detailed output in the console, which is helpful for debugging and understanding what Drizzle is doing.
   */
  verbose: true,

  /* Database connection credentials. */
  dbCredentials: {
    // Database user password. Retrieved from the environment variable `DB_PASSWORD`.
    password: env.DB_PASSWORD,

    // Database username. Retrieved from the environment variable `DB_USER`.
    user: env.DB_USER,

    // Name of the database to connect to. Retrieved from the environment variable `DB_NAME`.
    database: env.DB_NAME,

    // Host address of the database server. Retrieved from the environment variable `DB_HOST`.
    host: env.DB_HOST,

    // SSL configuration for secure connections.
    // Set to `false` for local development, but in production, this should be `true` with proper SSL certificates.
    ssl: false,
  }
});




















// import { env } from "@/data/env/server";
// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   out: "./src/drizzle/migrations",
//   schema: "./src/drizzle/schema.ts",
//   dialect: "postgresql",
//   strict: true,
//   verbose: true,
//   dbCredentials: {
//     password:env.DB_PASSWORD,
//     user:env.DB_USER,
//     database:env.DB_NAME,
//     host:env.DB_HOST,
//     ssl: false,
//   }
// })