import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const API = "https://task-manger-ykjf.onrender.com";
const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${API}/api/task/update/${params.id}`, {
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

  // get Single Task

  const GetSingleTask = async () => {
    try {
      const { data } = await axios.get(`${API}/api/task/get-single/${params.id}`);
      setTitle(data.tasks.title);
      setDescription(data.tasks.description);
      setDueDate(data.tasks.dueDate?.split("T")[0] || "");
      setPriority(data.tasks.priority);
      setStatus(data.tasks.status);
      console.log(setTitle(data.tasks.title));
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      GetSingleTask();
    }
  }, [params.id]);

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
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 mt-1 cursor-pointer"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateTask;
