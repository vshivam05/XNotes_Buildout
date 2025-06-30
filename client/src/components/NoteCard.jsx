import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNote } from "../context/NoteContext";
const NoteCard = ({ data, handleDelete }) => {
  const { setIsEditing, setNote, setEditId } = useNote();

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
  return (
    <div>
      <div className="container bg-gray-500 my-2 rounded-md p-2 w-full text-white">
        <h3 className="font-bold">{data.title}</h3>
        <p>{data.content}</p>

        {/* buttons */}
        <div className=" flex gap-4 justify-end flex-wrap">
          <button type="button"
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
          <button type="button"
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
          <button type="button" className="p-2 border border-indigo-500 rounded-md bg-gray-800">
            <span className="px-2 flex gap-2 items-center ">
              <MdOutlinePushPin /> Pin
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
