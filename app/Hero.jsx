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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-6">
      <div className="max-w-lg w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          My To-Do List
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex mb-6 flex-wrap gap-3 items-center"
        >
          <input
            type="text"
            value={inputname}
            onChange={(e) => setinputname(e.target.value)}
            placeholder="Write a task..."
            className="flex-1 rounded-xl p-4 text-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-xl px-6 py-3 font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-300"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        {/* Task List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Tasks</h2>
          <ul className="space-y-4">
            {name.map((naam, index) => (
              <li
                key={index}
                className="flex justify-between w-60 md:w-auto items-center p-4 rounded-xl bg-slate-700 shadow-md hover:bg-slate-600 transition-all duration-200"
              >
                <span
                  className={`text-lg ${
                    completed[index]
                      ? "text-gray-400 line-through"
                      : "text-white"
                  }`}
                >
                  {index + 1}. {naam}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => del(index)}
                    className="bg-red-500 text-white rounded-full md:p-2 p-1 hover:bg-red-600 "
                  >
                    <MdDelete size={16} />
                  </button>
                  <button
                    onClick={() => toggleComplete(index)}
                    className={`${
                      completed[index] ? "bg-green-600" : "bg-yellow-500"
                    } text-white rounded-full md:p-2 p-1 hover:opacity-90`}
                  >
                    <BiCheckCircle size={16} />
                  </button>
                  <button
                    onClick={() => editTask(index)}
                    className="bg-blue-500 text-white rounded-full md:p-2 p-1 hover:bg-blue-600"
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
