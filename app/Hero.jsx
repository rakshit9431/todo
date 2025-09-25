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
      setCompleted((prev) => {
        const newCompleted = [...prev];
        return newCompleted;
      });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a]  to-[#334155] p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          To-Do App List
        </h1>
        <form onSubmit={handleSubmit} className="flex mb-6 flex-wrap gap-4">
          <input
            type="text"
            value={inputname}
            onChange={(e) => setinputname(e.target.value)}
            placeholder="Add or edit a task..."
            className="flex-1 border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {editIndex !== null ? "Update" : "Add"} {/* Dynamic button text */}
          </button>
        </form>

        <ul className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Tasks:</h2>
          {name.map((naam, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-all duration-200"
            >
              <span
                className={`text-lg ${
                  completed[index]
                    ? "text-gray-400 line-through"
                    : "text-gray-800"
                }`}
              >
                {index + 1}. {naam}
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={() => del(index)}
                  className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <MdDelete size={20} />
                </button>
                <button
                  onClick={() => toggleComplete(index)} // Mark the task as complete
                  className="bg-yellow-600 text-white rounded-full p-2 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {completed[index] ? (
                    <BiCheckCircle size={20} />
                  ) : (
                    <BiCheckCircle size={20} />
                  )}
                </button>
                <button
                  onClick={() => editTask(index)} // Edit task
                  className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <MdModeEdit size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hero;
