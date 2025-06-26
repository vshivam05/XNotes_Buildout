import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../Services/api";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {login} = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await handleLogin(formData);
      console.log("log in success", res);
      if (res.status == 200) {
    //     localStorage.setItem("user", JSON.stringify(res.data.user));
    //     localStorage.setItem("token", res.data.token);
    //     setFormData({email: "",
    // password: ""});

    login(res.data.token, res.data.user);
    navigate("/notes")

      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="  overflow-hidden my-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-500 rounded-2xl shadow-lg p-8 ">
          <h2 className="text-2xl font-bold text-center text-white text-gray-800 mb-6">
            Log In
          </h2>
          <form className="Form space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white "
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className=" p-2 rounded-lg border-gray-300 shadow-sm"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white "
              >
                Password
              </label>
              <input
                type="text"
                placeholder="Enter your password"
                className=" p-2 rounded-lg border-gray-300 shadow-sm"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
              />
            </div>

            <button className="w-full bg-gray-600 rounded-lg p-2 text-white hover:bg-gray-700 transition duration-300 font-semibold">
              Log In
            </button>
          </form>
          <p className="text-center font-semibold">
            Don't have account?
            <Link
              to={"/register"}
              className="text-blue-800 underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
