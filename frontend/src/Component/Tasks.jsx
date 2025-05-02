import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios, { Axios } from "axios";
import { Link, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const API = "https://task-manger-ykjf.onrender.com";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const getAllTask = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const search = params.get("search");
      const status = params.get("status");
      const priority = params.get("priority");

      let endpoint = {`${API}/api/task/get-all`};

      if (search || status || priority) {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set("search", search);
        if (status) queryParams.set("status", status);
        if (priority) queryParams.set("priority", priority);

        endpoint = `${API}/api/task/search?${queryParams.toString()}`;
      }

      const { data } = await axios.get(endpoint);
      setTasks(data?.tasks || []);
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllTask();
  }, [location.search]);

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/api/task/delete/${id}`);
      if (data && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mt-10 card h-auto">
        {tasks.map((task) => (
          <>
            <div
              key={task._id}
              className="border border-gray-400 w-full sm:w-72 md:w-40 lg:w-80 h-[30vh]  md:h-[35vh] flex flex-col justify-between p-4 sm:p-5 mt-3 sm:mt-5 rounded-2xl md:ms-2 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-2 sm:gap-4">
                <div className="w-full sm:w-4/5 overflow-hidden">
                  <p className="font-semibold break-words">{task.title}</p>
                  <p className="break-words text-sm text-gray-600 max-h-20 overflow-y-auto scrollbar-none pr-1 w-full">
                    {task.description}
                  </p>
                </div>
                <p className="text-red-500 text-sm whitespace-nowrap self-start">
                  <span>DeuDate: {task.dueDate.split("T")[0]}</span>
                </p>
              </div>

              <div className="flex justify-between">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <p
                      className={`border p-0.5 rounded text-sm ${
                        task.status === "In Progress"
                          ? "border-orange-400 text-orange-400"
                          : task.status === "Done"
                          ? "border-green-600 text-green-500"
                          : "text-green-400 bg"
                      }`}
                    >
                      {task.status}
                    </p>

                    <p
                      className={`border p-0.5 rounded text-sm ${
                        task.priority === "Low"
                          ? "border-red-500 text-red-500"
                          : task.priority === "High"
                          ? "border-green-500 "
                          : "border-gray-400 text-gray-700"
                      }`}
                    >
                      {task.priority}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/update/${task._id}`}>
                    <EditIcon className="text-blue-400 border border-gray-400 rounded font-semibold" />
                  </Link>
                  <DeleteIcon
                    className="text-red-500"
                    onClick={() => deleteTask(task._id)}
                  />
                </div>
              </div>
            </div>
          </>
        ))}

        <div className="add hover:scale-90 transition-opacity-10 duration-300">
          <Link to={"/create"} className="font-semibold cursor-pointer">
            <p>Add Task +</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
