import React from "react";
import { useNavigate } from "react-router-dom";

const NavTab = () => {
  const navigate = useNavigate();
  const handlePriority = (priority) => {
    const params = new URLSearchParams(window.location.search);
    params.set("priority", priority);
    navigate(`/?${params.toString()}`);
  };
  return (
    <div>
      <div>
        <div className="flex gap-3 p-2">
          <p
            onClick={() => handlePriority("Low")}
            className="border border-gray-500 rounded  p-1 mt-2 text-center text-sm text-bold cursor-pointer font-semibold hover:bg-blue-600 transition-all duration-300 hover:text-white"
          >
            Low
          </p>
          <p
            onClick={() => handlePriority("Medium")}
            className="border border-gray-500 rounded  p-1 mt-2 text-center text-sm text-bold cursor-pointer hover:bg-blue-600 transition-all duration-300 hover:text-white font-semibold"
          >
            Medium
          </p>
          <p
            onClick={() => handlePriority("High")}
            className="border border-gray-500 rounded  p-1 mt-2 text-center text-sm text-bold cursor-pointer hover:bg-blue-600 transition-all duration-300 hover:text-white font-semibold"
          >
            High
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavTab;
