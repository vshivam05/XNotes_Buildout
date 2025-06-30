import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNote } from "../context/NoteContext";
import { handlePin } from "../Services/api";
const NoteCard = ({ data, handleDelete }) => {
  const { setIsEditing, setNote, setEditId, setPin, pin, setNotes, notes } = useNote();

  const handleView = (data) => {
    setIsEditing(true);
    console.log(data);
    if (data) {
      setNote({
        title: data.title,
        content: data.content,
        pinned: data.pinned,
      });
      setEditId(data._id);
    }
  };
  const HandlePin = async (id) => {
  try {
    const res = await handlePin(id);
    if (res.status == 200) {
      console.log("pinned successfully");
      setNotes((prev) => {
       
        const updated = prev.map((ele) =>
          ele._id === id ? { ...ele, pinned: !ele.pinned } : ele
        );

        
        const pinned = updated.filter((note) => note.pinned);
        const unpinned = updated.filter((note) => !note.pinned);
        return [...pinned, ...unpinned];
      });
    }
  } catch (error) {
    alert(error);
  }
};


  return (
    <div>
      <div className="container bg-gray-500 my-2 rounded-md p-2 w-full text-white">
        <h3 className="font-bold">{data.title}</h3>
        <p>{data.content}</p>

        {/* buttons */}
        <div className=" flex gap-4 justify-end flex-wrap">
          <button
            type="button"
            className="  border border-indigo-500 rounded-md bg-gray-800"
            onClick={() => {
              handleView(data);
            }}
          >
            <span className="px-2 flex gap-2 items-center ">
              {" "}
              <FaRegEdit /> View/Edit
            </span>
          </button>
          <button
            type="button"
            className="p-2 border border-indigo-500 rounded-md bg-gray-800"
            onClick={() => {
              handleDelete(data._id);
            }}
          >
            <span className="px-2 flex gap-2 items-center ">
              {" "}
              <MdDelete /> Delete
            </span>
          </button>
          <button
            type="button"
            className="p-2 border border-indigo-500 rounded-md bg-gray-800"
            onClick={() => {
              HandlePin(data._id);
            }}
          >
            <span className="px-2 flex gap-2 items-center ">
              <MdOutlinePushPin /> {data.pinned ? "Unpin" : "Pin"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
