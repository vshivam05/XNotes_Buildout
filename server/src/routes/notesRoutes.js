import express from "express";
import {
  createNotes,
  updateNotesController,
  getAllNotesController,
  deleteNoteController,
  pinNoteController,
  getUsersNotes,
} from "../controllers/notesController.js";
const router = express.Router();

import { auth } from "../middlewares/authMiddleware.js";

//to create notes

router.post("/", auth, createNotes);

router.put("/:note_id", auth, updateNotesController);
// update notes

// //get all notes
router.get("/", auth, getAllNotesController);

// get note for user
router.get("/id", auth, getUsersNotes);

// // delete notes

router.delete("/:note_id", auth, deleteNoteController);

// to pin the notes
router.put("/:note_id/pin", pinNoteController);

export default router;
