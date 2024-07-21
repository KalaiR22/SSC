// SignUp.jsx
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const notify = () =>
    toast.success("OTP SENT successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const formattedPhoneNumber = phoneNumber.startsWith("+")
        ? phoneNumber
        : `+${phoneNumber}`;
      if (!formattedPhoneNumber || formattedPhoneNumber.length < 10) {
        throw new Error("Invalid phone number");
      }

      await axios.post("http://localhost:3000/api/auth/sendotp", {
        phoneNumber: formattedPhoneNumber,
        email
      });
      notify();
      console.log("OTP sent");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log(phoneNumber, otp, username, password, email); // Check data in console
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verifyuser",
        {
          phoneNumber,
          otp,
          username,
          password,
          email,
        }
      );
      console.log(response.data);
      if (
        response.data.message === "Phone number verified and user data updated"
      ) {
        setVerified(true);
        console.log("Phone number verified");
      }
    } catch (err) {
      console.error(err.response.data); // Log the full error response
    }
  };


  return (
    <div className="absolute login w-full h-screen">
      <div className="bg-white sm:w-[500px] md:w-[700px] lg:w-[759px] sm:mx-auto lg:px-40 md:px-32 sm:px-24 px-8 mx-4 flex flex-col gap-3 py-10 my-3 rounded-xl">
        <h1 className="sm:text-[36px] text-[28px] font-regular">Welcome 👋</h1>
        <p className="text-blue sm:text-[20px] text-[15px] font-regular">
          Today is a new day. It's your day. You shape it. <br />
          Sign up to start managing your days with challenges.
        </p>

        {!verified ? (
          <form className="flex flex-col gap-4">
            <div>
              <p className="text-[16px] font-regular">Username</p>
              <input
                type="text"
                value={username}
                placeholder="Make fun with name"
                className="input-box"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <p className="text-[16px] font-regular">Email</p>
              <input
                value={email}
                type="email"
                placeholder="Example@email.com"
                className="input-box"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <p className="text-[16px] font-regular">Password</p>
              <input
                type="password"
                value={password}
                placeholder="At least 8 characters"
                className="input-box"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <p className="text-[16px] font-regular">Mobile no</p>
              <PhoneInput
                country={"us"}
                value={phoneNumber}
                onChange={setPhoneNumber}
                inputClass="input-box"
                enableSearch={true}
              />
            </div>
            <div className="mt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input-box"
                />
                <button
                  className="bg-green py-2 text-white text-[15px] font-regular w-[7rem] px-2 rounded-md"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              </div>
            </div>
            <div id="recaptcha-container"></div>
            <button
              className="bg-green py-2 text-white text-[20px] font-regular w-full rounded-md"
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
          </form>
        ) : (
          <div>
            <h3>Phone number verified and user signed up successfully</h3>
          </div>
        )}

        <h3 className="text-[18px] font-regular mx-auto">
          Already have an account?{" "}
          <span className="text-[#1E4AE9]">
            {" "}
            <Link to='/login'>Sign in</Link>
          </span>
        </h3>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}
