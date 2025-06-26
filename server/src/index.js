// index.js
import dotenv from "dotenv";
import app from "./app.js";
import { dbConnect } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

dbConnect();
app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
