import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";
import env from "../config/env.js";


const adapter = new PrismaMariaDb({
  host: env.dbHost,
  user: env.dbUser,
  password: env.dbPass,
  database: env.dbName,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
