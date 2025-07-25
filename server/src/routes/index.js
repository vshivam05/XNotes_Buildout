import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import notesRoutes from "./notesRoutes.js"
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/notes", notesRoutes)

export default router;
