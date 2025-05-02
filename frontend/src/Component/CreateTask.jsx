import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const API = "https://task-manager-mern-2i7g.onrender.com";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/task/create", {
        title,
        description,
        dueDate,
        priority,
        status,
      });
      if (data && data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Create Task</p>

        <>
          <div className="w-full">
            <p>Full Name:</p>
            <input
              type="text"
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter Full Name..."
              required
            />
          </div>

          <div className="w-full">
            <p>Descripton:</p>
            <textarea
              type="text"
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Enter Description..."
              required
            />
          </div>
        </>

        <div className="w-full">
          <p>DeuDate:</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </div>
        <div className="w-full">
          <p>Priority:</p>
          <select
            className="w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="w-full">
          <p>Status:</p>
          <select
            className="w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Select Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 mt-1 cursor-pointer"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateTask;
