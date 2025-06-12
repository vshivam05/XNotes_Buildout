
import { dbConnect } from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js"
dotenv.config();

 dbConnect();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});

