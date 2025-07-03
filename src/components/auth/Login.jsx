import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const loginHandler = async (data) => {
    console.log("Login is click");
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Login to your account to continue
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(loginHandler)}>
          {/* Email */}
          <InputField
            label="Your Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your Username here"
            register={register}
            errors={errors}
          />

          {/* Password */}
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password here"
            register={register}
            errors={errors}
          />

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loader}
            className={`w-full py-3 px-4 rounded-lg hover:cursor-pointer  font-semibold text-white transition 
                        bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 
                        hover:brightness-110 disabled:opacity-50`}
          >
            {loader ? (
              <div className="flex items-center justify-center gap-4">
                <Spinners /> Logging...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or continue with</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Social Login Buttons (optional) */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400  hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/448227/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
            Facebook
          </button>
        </div>

        {/* Register link */}
        <p className="text-sm text-center text-gray-500 mt-8">
          Don’t have an account?{" "}
          <Link to={"/register"}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Register
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
