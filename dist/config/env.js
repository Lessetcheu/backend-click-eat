import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({
    path: path.join(__dirname, "../../.env"),
});
const env = {
    port: process.env.PORT ? +process.env.PORT : 3000,
    host: process.env.HOST || "0.0.0.0",
    nodeEnv: process.env.NODE_ENV,
    dbHost: process.env.DATABASE_HOST,
    dbUser: process.env.DATABASE_USER,
    dbPass: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
};
export default env;
//# sourceMappingURL=env.js.map