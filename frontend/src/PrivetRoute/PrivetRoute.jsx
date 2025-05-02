import { useEffect, useState } from "react";
import { useAuth } from "../Context/Context";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import axios from "axios";

// const API = "https://task-manager-mern-2i7g.onrender.com";

export default function PrivetRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/user/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Login />;
}
