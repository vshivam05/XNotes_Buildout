// to create a notes
import Note from "../models/noteSchema.js";
import {
  createNote,
  UpdateNoteService,
  getAllNoteService,
  deleteNoteService,
  pinNoteservice,
  getUserNotesService,
} from "../services/noteService.js";

export const createNotes = async (req, res) => {
  console.log(req.body);

  try {
    const newData = {
      ...req.body,
      user: req.user.userId,
    };
    const result = await createNote(newData);

    console.log(result);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const updateNotesController = async (req, res) => {
  const { note_id } = req.params; // from URL

  console.log(req.body);
  // console.log("id", note_id);
  // res.send("Received");
  try {
    const updatedNote = await UpdateNoteService(note_id, req.body);

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating note", error: err.message });
  }
};

export const getAllNotesController = async (req, res) => {
  try {
    const result = await getAllNoteService();
    console.log("from the getAll note controller", result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const getUsersNotes = async (req, res) => {
  const  id  = req.user.userId;
  
  console.log("from the getusernotes controller id",id)
  try {
    const result = await getUserNotesService(id);
    console.log("from the getAll note controller", result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const deleteNoteController = async (req, res) => {
  const { note_id } = req.params;

  try {
    const result = await deleteNoteService(note_id);

    if (!result) {
      return res.status(404).json("Notes not found");
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const pinNoteController = async (req, res) => {
  const { note_id } = req.params;
  console.log("note id", note_id);
  try {
    const result = await pinNoteservice(note_id);

    if (!result) {
      return res.status(404).json("Notes not found");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
