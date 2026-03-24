import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import morgan from "morgan";
import env from "./config/env.js";
import router from "./router/index.js";
import handleGlobalError from "./middleware/handleGlobalError.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.set("trust proxy", 1);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", router);

app.use(handleGlobalError);

// -------------------------
// Lancer le serveur
// -------------------------
app.listen(env.port, env.host, (error) => {
  if (error) {
    console.log(error);
    process.exit(1); // En cas d'erreur, on arrête le serveur
  }
  console.log(`Our application running at : http://${env.host}:${env.port}`);
});
