import React, { useState } from "react";
import axios from "axios";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/password/resetpassword",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sending reset email. Please try again.");
    }
  };

  return (
    <div className="absolute login w-full h-screen flex items-center justify-center">
      <div className="bg-white sm:w-[500px] md:w-[700px] lg:w-[759px] sm:mx-auto lg:px-40 md:px-32 sm:px-24 px-8 mx-4 flex flex-col gap-5 py-10 my-3 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-[24px] font-medium text-center">Enter Email</p>
            <input
              type="email"
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
