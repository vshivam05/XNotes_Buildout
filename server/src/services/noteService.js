import Note from "../models/noteSchema.js";

// create user

export const createNote = async (data) => {
  try {
    const note = await Note.create(data);
    console.log(note);

    return note;
  } catch (error) {
    return error;
  }
};

export const UpdateNoteService = async (id, data) => {
  try {
    const updated = await Note.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    console.log(updated);
    return updated;
  } catch (error) {
    return error;
  }
};

export const getAllNoteService = async () => {
  try {
    const findNotes = await Note.find({});

    return findNotes;
  } catch (error) {
    return error;
  }
};

export const deleteNoteService = async (id) => {
  try {
    const result = await Note.findByIdAndDelete(id);

    if (!result) {
      return null;
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const pinNoteservice = async (id) => {
  try {
    const findNote = await Note.findById(id);
console.log("note exist from Pinservice", findNote);
    if (!findNote) {
      return null;
    }
      const result = await Note.findByIdAndUpdate(
      id,
      { pinned: !findNote.pinned }, // ✅ toggle the value
      {
        new: true,             
        runValidators: true    
      }
    );


    return result;
  } catch (error) {
    throw error;
  }
};
