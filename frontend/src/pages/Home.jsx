import React from "react";

import Tasks from "../Component/Tasks";
import NavTab from "../Component/NavTab";
import Sidebar from "../Component/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="md:flex justify-between md:w-full home">
        <Tasks />
        <NavTab />
      </div>
    </div>
  );
};

export default Home;
