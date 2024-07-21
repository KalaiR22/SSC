import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Form submitted");

    if (!email || !password) {
      console.log("Please fill out all fields.");
      dispatch(signInFailure("Please fill out all fields."));
      return setError("Please fill out all fields.");
    }

    try {
      dispatch(signInStart());
      console.log("Dispatch signInStart");
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      console.log("Response received", response.data);

      const data = response.data;

      // Assuming the success field might not be present, check for the presence of the token
      if (!data.token) {
        const message = data.message || "Login failed";
        console.log("Login failed:", message);
        dispatch(signInFailure(message));
        return setError(message);
      }

      const { token } = data;
      console.log("Login successful, token received:", token);
      localStorage.setItem("access_token", token);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      console.log("Error:", err.message);
      dispatch(signInFailure(err.message));
      setError(err.message);
    }
  };

  return (
    <div className="absolute login w-full h-screen">
      <div className="bg-white sm:w-[500px] md:w-[700px] lg:w-[759px] sm:mx-auto lg:px-40 md:px-32 sm:px-24 px-8 mx-4 flex flex-col gap-3 py-10 my-3 rounded-xl mt-10">
        <h1 className="sm:text-[36px] text-[28px] font-regular">
          Welcome Back 👋
        </h1>
        <p className="text-blue sm:text-[20px] text-[15px] font-regular">
          Today is a new day. It's your day. You shape it. <br />
          Sign up to start managing your days with challenges.
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <p className="text-[16px] font-regular">Email</p>
            <input
              type="email"
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-box"
            />
          </div>
          <div>
            <p className="text-[16px] font-regular">Password</p>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
            />
          </div>
          <p className="text-[#1E4AE9] font-regular text-[16px] text-right">
            Forgot Password?
          </p>

          <button
            type="submit"
            className="bg-green py-2 text-white text-[20px] font-regular w-full rounded-md"
          >
            Sign in
          </button>
        </form>

        <h3 className="text-[18px] font-regular mx-auto">
          Already have an account?
          <span className="text-[#1E4AE9]">
            <Link to="/signup">Sign up</Link>
          </span>
        </h3>
      </div>
    </div>
  );
}
