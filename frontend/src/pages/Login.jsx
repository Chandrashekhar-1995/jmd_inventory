import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsEmojiLaughing } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/userApiSlice";
import { userCredentials } from "../store/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("/redirect") || "/dashboard";
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/dashboard");
  //   }
  // }, []); 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ identifier, password }).unwrap(); 
      dispatch(userCredentials(res.data));
      toast.success("login Succesfully");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto sm:px-3 md:px-0 p-2 mt-6 md:mt-12"
    >
      {/* Sign in Form Goes Here */}

      <form
        className="max-w-md mx-auto bg-white p-8  rounded shadow-lg"
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-2xl font-bold">Sign In </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-500 text-sm font-bold"
          >
            Email
          </label>
          <input
            placeholder="Enter your Email "
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-500 text-sm font-bold"
          >
            password
          </label>
          <input
            type="password"
            placeholder="Enter your password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-800 p-2 px-4 text-slate-50 rounded-xl cursor-pointer
           hover:bg-slate-400 hover:text-slate-950  "
        >
          Sign in
        </button>

        <div className="py-2 text-lg font-bold text-gray-4 00 cursor-pointer">
          <p>
            Don't have An Account
            <Link
              to="/register"
              className="text-blue-700 ml-2 hover:underline "
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default Login;