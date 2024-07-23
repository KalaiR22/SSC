import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); // Extract the token from the URL path
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/password/resetpassword/${token}`,
        { password } // Send the new password in the request body
      );
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };
   

  return (
    <div className="absolute login w-full h-screen flex items-center justify-center">
      <div className="bg-white sm:w-[500px] md:w-[700px] lg:w-[759px] sm:mx-auto lg:px-40 md:px-32 sm:px-24 px-8 mx-4 flex flex-col gap-5 py-10 my-3 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-[24px] font-medium text-center">
              Enter New Password
            </p>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box mt-12"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green py-2 text-white text-[20px] font-regular w-full rounded-md mt-4"
          >
            Send
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-[24px] font-medium text-brown">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
