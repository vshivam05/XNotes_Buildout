import mongoose from "mongoose";

export const dbConnect = async () => {
  const dbUrl = process.env.DB_URL;

  // if (!dbUrl) {
  //   console.error("❌ DB_URL is undefined. Check your .env file.");
  //   return;
  // }

  console.log("Connecting to:", dbUrl);

  try {
    await mongoose.connect(dbUrl);

    console.log("✅ DB connected successfully");
  } catch (e) {
    console.error("❌ Error while connecting to DB:", e.message);
    process.exit(1);
  }
};


