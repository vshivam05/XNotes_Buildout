import { createContext, useContext, useEffect, useState } from "react";
import { AddNotes, getAlNotes } from "../Services/api";
const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    description: "",
    pinned: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  // const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);

  const addNote = async (e) => {
    e.preventDefault();
    console.log(note);
    try {
      const res = await AddNotes(note);
      console.log(res.data);
      if (res.status == 201) {
        console.log("Note created successfully");
        setNotes([...notes, res.data]);
        // fetchNotes();
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await getAlNotes();

        if (res.status == 200) {
          console.log("fetched all notes", res.data);
          setNotes(res.data);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    console.log(notes);
    fetchNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{
        addNote,
        setNote,
        setNotes,
        notes,
        fetchNotes,
        isEditing,
        setIsEditing,
        note,
        setEditId,
        editId,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
