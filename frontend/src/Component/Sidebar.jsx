import React from "react";
import { useAuth } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleStatusFilter = (status) => {
    const params = new URLSearchParams(window.location.search);
    params.set("status", status);
    navigate(`/?${params.toString()}`);
  };

  const crearFilter = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-200 min-h-[90vh] relative">
      <div className="flex flex-col gap-20 justify-center p-2 w-35 ">
        <div className="text-center">
          <p className="font-bold">Name: {auth.user?.name}</p>
          <p className="text-sm ">Username: {auth.user?.username}</p>
          <hr className="border-1 border-black-400 mt-2" />
        </div>

        {/* ------filter------ */}

        <div className="text-center">
          <ul className="flex flex-col gap-3">
            <li
              onClick={() => handleStatusFilter("Todo")}
              className="border border-black rounded-full text-black font-bold hover:bg-blue-500 transition-all duration-300 cursor-pointer"
            >
              Todo
            </li>
            <li
              onClick={() => handleStatusFilter("In Progress")}
              className="border border-black rounded-full text-black font-bold hover:bg-blue-500 transition-all duration-300 cursor-pointer"
            >
              In Progress
            </li>
            <li
              onClick={() => handleStatusFilter("Done")}
              className="border border-black rounded-full text-black font-bold hover:bg-blue-500 transition-all duration-300 cursor-pointer"
            >
              Done
            </li>

            <li
              onClick={crearFilter}
              className="border border-black rounded-full text-black font-bold hover:bg-blue-500 transition-all duration-300 cursor-pointer"
            >
              Clear filters
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
