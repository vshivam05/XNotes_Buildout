
import express from "express";

import fetchUser from "../controllers/userController.js"

const router = express.Router();

router.get("/", fetchUser );

export default router;
