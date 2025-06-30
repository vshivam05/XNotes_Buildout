import React, { useState } from "react";
import { useNote } from "../context/NoteContext";
import { EditService } from "../Services/api";
const View = () => {
  const [edit, setEdit] = useState(false)
  const { setIsEditing, note, setNote, editId, setEditId, fetchNotes } =
    useNote();
  // console.log(note);

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    
    
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
    setEdit(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {          
      await EditService(editId, note);
      setNote({ title: "", description: "", date: "" });
      setEditId(null);
      fetchNotes();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <div className="w-[500px] bg-gray-100  rounded-md p-2">
        <h1 className=" font-bold text-center pt-2 ">This is a new Note.</h1>
        <hr className="border-t-2 border-gray-500 my-4" />

        <div className="form">
          <form action="">
            <div className="title flex flex-col p-2">
              <label htmlFor="title" className="font-bold py-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={note.title}
                placeholder="This is a new note."
                className="bg-gray-800 p-2 rounded-md text-white border-indigo-500"
                onChange={handleChangeEdit}
              />
            </div>

            <div className="content flex flex-col p-2 ">
              <label htmlFor="content" className="font-bold py-2">
                Content
              </label>
              <input
                type="text"
                value={note.content ?? ""}
                name="content"
                placeholder="This is the content of the new note."
                className="bg-gray-800 p-2 rounded-md text-white border-indigo-500"
                onChange={handleChangeEdit}
              />
            </div>

            <div className="buttons flex flex-row p-2 gap-2 justify-end">
              <button type="submit" onClick={handleEditSubmit}
                className={edit ? "p-2 px-4 border border-indigo-500 text-blue-400 rounded-md" : "p-2 px-4 border border-indigo-500 text-red-400 rounded-md"}

              >
              { edit ? "Save" : "Edit" }
              </button>
              <button
                className="p-2 px-4 border border-orange-400 rounded-md text-orange-500"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default View;
