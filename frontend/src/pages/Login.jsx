import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Context";

const API = "https://task-manger-ykjf.onrender.com";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/user/login`, {
        password,
        email,
      });
      if (res.data && res.data.success) {
        navigate(location.state || "/");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        toast.success(res.data && res.data.message);
        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold"></p>
        <p>Please up to book appointment</p>

        <div className="w-full">
          <p>Email:</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email..."
            required
          />
        </div>
        <div className="w-full">
          <p>Password:</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 mt-1 cursor-pointer"
        >
          Login
        </button>

        <Link to={"/register"}>
          Create an new account?{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Click here!
          </span>
        </Link>
      </div>
    </form>
  );
};

export default Login;
