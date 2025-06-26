import React from "react";

import { FaDharmachakra } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  // console.log(token);
  const { token, user, logout } = useAuth();

  console.log(user);
  return (
    <>
      <div className="w-full overflow-hidden ">
        <header className="w-full overflow-hidden bg-gray-600 text-white">
          <div className=" mx-auto px-4 py-4 mx-4 flex flex-wrap items-center justify-between">
            <div className="text-lg font-semibold">Notes App</div>
            <nav>
              <ul className="flex gap-6 text-sm font-medium items-center justify-center">
                {token ? (
                  <>
                    <li>Hi, {user.name}</li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={"/"} className="hover:underline">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to={"/register"} className="hover:underline">
                        Register
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link to={"/"} className="hover:underline">
                    {<FaDharmachakra />}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
