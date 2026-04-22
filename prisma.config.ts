import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "bun ./prisma/seed.ts",
  },
  datasource: {
    // We use DIRECT_URL for migrations and db push (no pgbouncer)
    url: env("DIRECT_URL"),
  },
});
