import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const password = watch("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const registerHandler = async (data) => {
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Register a new account to get started
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(registerHandler)}>
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />

          <InputField
            label="Confirm Password"
            required
            id="confirmPassword"
            type="password"
            message="*Please confirm your password"
            placeholder="Re-enter your password"
            register={register}
            errors={errors}
            validate={(value) => value === password || "Passwords do not match"}
          />

          <button
            type="submit"
            className={`w-full hover:cursor-pointer py-3 px-4 rounded-lg font-semibold text-white transition 
                        bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 
                        hover:brightness-110`}
          >
            {loader ? "...Register" : "Register"}
          </button>
        </form>

        {/* <div className="flex items-center gap-2 my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or continue with</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div> */}

        {/* <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/448227/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
            Facebook
          </button>
        </div> */}

        <p className="text-sm text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
