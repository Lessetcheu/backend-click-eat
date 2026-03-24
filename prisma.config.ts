import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node ./prisma/seeds/index.js',
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
