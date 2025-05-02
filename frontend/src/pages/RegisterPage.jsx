import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API = "https://task-manger-ykjf.onrender.com";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserame] = useState("");
  const navigate = useNavigate();
  const handleSubmmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/api/user/register`, {
        password,
        email,
        username,
        name,
      });
      if (data && data.success) {
        toast.success(data.message);

        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold"></p>
        <p>Please up to book appointment</p>
        <>
          <div className="w-full">
            <p>Full Name:</p>
            <input
              type="text"
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Full Name..."
              required
            />
          </div>

          <div className="w-full">
            <p>Username:</p>
            <input
              type="text"
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              onChange={(e) => setUserame(e.target.value)}
              value={username}
              placeholder="Enter Full Name..."
              required
            />
          </div>
        </>
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
          Regiter
        </button>
        <Link to={"/login"}>
          Already have an account?{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Login here
          </span>
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
