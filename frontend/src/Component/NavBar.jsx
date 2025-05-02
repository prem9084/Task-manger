import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Context";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
    toast.success("Logout Succesfully");
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(location.search);

      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      navigate(`/?${params.toString()}`, { replace: true });
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="flex items-center justify-between text-sm py-4  border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-23 cursor-pointer"
        src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg"
        alt=""
      />
      {auth?.user ? (
        <>
          <div className="gap-2  md:flex hidden font-medium">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="w-100 md:w-100 p-2 rounded-full border-2"
              type="search"
              placeholder="Enter"
            />
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="flex items-center gap-4">
        <>
          {auth.user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-white px-8 py-3 cursor-pointer rounded-full hidden md:block"
                style={{ backgroundColor: "#5f6FFF" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-white px-8 py-3 cursor-pointer rounded-full hidden md:block"
                style={{ backgroundColor: "#5f6FFF" }}
              >
                Create Account
              </button>
            </>
          )}
        </>

        <img
          className="w-6 md:hidden"
          src="https://cdn5.vectorstock.com/i/1000x1000/91/84/modern-menu-icon-for-mobile-apps-and-websites-vector-16849184.jpg"
          onClick={() => setShowMenu(true)}
        />
        {/* -------Mobile Menu------ */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img
              className="w-20"
              src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg"
              alt=""
            />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfJ1BZV17GSZveEVOpbiPQ-4GkQjH4UZ_UdA&s"
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <div className="gap-2 flex">
              <input
                className="md:w-100 p-1 rounded border-2"
                type="search"
                placeholder="Enter"
              />
              <button className="border border-black rounded-full p-2 cursor-pointer">
                <img
                  className="w-5"
                  src="https://t3.ftcdn.net/jpg/03/25/73/68/360_F_325736897_lyouuiCkWI59SZAPGPLZ5OWQjw2Gw4qY.jpg"
                  alt=""
                />
              </button>
            </div>
            {auth && auth.user ? (
              <button className="px-4 py-2 rounded-full border border-gray-500">
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-white px-3 py-1 cursor-pointer rounded-full"
                style={{ backgroundColor: "#5f6FFF" }}
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
