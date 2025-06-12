import express from "express";
import cors from "cors";

const app = express();
import { dbConnect } from "./config/db.js";
app.use(express.json());
import routes from "./routes/index.js";
dbConnect();
app.use(cors());

app.use("/api", routes);


export default app;