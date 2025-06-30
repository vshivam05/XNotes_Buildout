import express from "express";
import cors from "cors";
import { dbConnect } from "./config/db.js";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", routes);

export default app;
