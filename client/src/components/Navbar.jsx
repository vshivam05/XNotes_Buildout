import React from "react";

import { FaDharmachakra } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  // console.log(token);
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  console.log(user);
  return (
    <>
      <div className="w-full overflow-hidden ">
        <header className="w-full overflow-hidden bg-gray-600 text-white">
          {/* <div className=" "> */}
            <nav className="mx-auto px-4 py-4 mx-4 flex flex-wrap items-center justify-between">
              <div className="text-lg font-semibold ">Notes App</div>
              <ul className="flex gap-6 text-sm font-medium items-center justify-center">
                {token ? (
                  <>
                    <li>Hi, {user.name}</li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button>
                      <Link to={"/login"} className="hover:underline">
                        Login
                      </Link>
                      </button>
                    </li>
                    <li>
                      <button>
                      <Link to={"/"} className="hover:underline">
                        Register
                      </Link>
                      </button>
                    </li>
                  </>
                )}

                <li>
                  <button>
                  <Link to={"/"} className="hover:underline">
                    {<FaDharmachakra />}
                  </Link>
                  </button>
                </li>
              </ul>
            </nav>
          {/* </div> */}
        </header>
      </div>
    </>
  );
};

export default Navbar;
