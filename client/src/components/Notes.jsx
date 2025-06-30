import React, { useEffect } from "react";
import { useNote } from "../context/NoteContext";
// import { useState } from "react";
import { DeleteService } from "../Services/api";
import NoteCard from "./NoteCard";
import View from "./View";
const Notes = () => {
  // const [formData, setFormData] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  const { addNote, setNote, setNotes, notes, fetchNotes, isEditing } =
    useNote();

  useEffect(() => {
    console.log("token detected");
    fetchNotes();
  }, [token]);

  const handleChanges = (e) => {
    console.log(e.target.name, e.target.value);
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async (id) => {
    console.log(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    await DeleteService(id);
    fetchNotes();
  };

  return (
    <>
      <div className=" w-screen  overflow-hidden my-2  px-4  md:w-full md:mx-auto md:px-0">
        <div className="notes-section md:max-w-full flex flex-col   rounded-2xl shadow-lg md:px-40  my-10">
          {isEditing && (
            <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <View />
            </div>
          )}

          <div className="flex flex-row w-full gap-2 py-4">
            <input
              type="text"
              placeholder="Search notes..."
              className="  p-2 rounded-md w-4/5"
            />
            <button
              type="submit"
              className="p-2 rounded-md w-1/5 border text-white bg-gray-800 border-indigo-500"
            >
              Search
            </button>
          </div>
          <div className="form-section  w-full  bg-gray-500 p-4  rounded-lg">
            <form action="" onSubmit={addNote}>
              <div className="flex flex-col w-full gap-2">
                <div className="h1 font-bold text-xl text-white">
                  <h1>Create a New Note</h1>
                </div>

                <div className="title flex flex-col w-full gap-2">
                  <label htmlFor="title" className="font-bold">
                    Title
                  </label>
                  <input
                    type="text"
                    className=" p-2 rounded-md"
                    onChange={handleChanges}
                    name="title"
                  />
                </div>

                <div className="content flex flex-col w-full gap-2">
                  <label htmlFor="content" className="font-bold">
                    Content
                  </label>

                  <textarea
                    className="p-4 rounded-lg"
                    name="content"
                    onChange={handleChanges}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="p-2 rounded-md border-indigo-500 border my-2 bg-gray-800 text-white"
              >
                Create Note
              </button>
            </form>
          </div>

          {/* Note section  */}

          <div className="flex flex-col w-full">
            <h1 className="text-white py-2 font-bold">My Notes</h1>
            {notes.length > 0 ? (
              <div className="">
                {notes.map((note, index) => (
                  // <h1 key={index}>{console.log(note.title)}</h1>
                  // Assuming each note has a 'title' field
                  <NoteCard
                    data={note}
                    key={index}
                    handleDelete={handleDelete}
                  />
                ))}
              </div> 
            ) : (
              <p className=" w-full bg-blue-200 p-2 rounded-md">
                No notes available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
