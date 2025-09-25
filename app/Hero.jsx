"use client";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import React, { useState } from "react";

const Hero = () => {
  const [inputname, setinputname] = useState("");
  const [name, setName] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputname.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...name];
      updatedTasks[editIndex] = inputname;
      setName(updatedTasks);
      setEditIndex(null);
    } else {
      setName([...name, inputname]);
      setCompleted([...completed, false]);
    }

    setinputname("");
  };

  const del = (index) => {
    setName((prev) => prev.filter((_, i) => i !== index));
    setCompleted((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setCompleted((prev) => {
      const newCompleted = [...prev];
      newCompleted[index] = !newCompleted[index];
      return newCompleted;
    });
  };

  const editTask = (index) => {
    setinputname(name[index]);
    setEditIndex(index);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-900 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">My To-Do List</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            value={inputname}
            onChange={(e) => setinputname(e.target.value)}
            placeholder="Write a task..."
            className="p-3 rounded bg-gray-700 text-white outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded font-semibold"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        <div>
          <h2 className="text-lg font-semibold mb-3">Tasks</h2>
          <ul className="space-y-3">
            {name.map((naam, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
              >
                <span
                  className={`break-words max-w-[200px] ${
                    completed[index] ? "line-through text-gray-400" : ""
                  }`}
                >
                  {index + 1}. {naam}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => del(index)}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded"
                  >
                    <MdDelete size={16} />
                  </button>
                  <button
                    onClick={() => toggleComplete(index)}
                    className={`${
                      completed[index] ? "bg-green-600" : "bg-yellow-500"
                    } p-2 rounded`}
                  >
                    <BiCheckCircle size={16} />
                  </button>
                  <button
                    onClick={() => editTask(index)}
                    className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
                  >
                    <MdModeEdit size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
