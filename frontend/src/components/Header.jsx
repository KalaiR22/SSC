import React from 'react'
import sustain from '../images/sustain.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from '../redux/user/userSlice';
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
   const dispatch = useDispatch();
     const navigate = useNavigate();
  

  console.log(currentUser)

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="relative z-50 ">
      <div className="bg-green w-full  fixed flex justify-between items-center px-6 sm:px-10 md:px-16  xl:px-24 mt-0">
        <img src={sustain} alt="" className="sm:h-20 h-14 sm:w-fit w-32 mt-3" />
        {currentUser && currentUser.user ? (
          <Link to='/dashboard'>
            <div className="flex items-center">
              <p className=" border-2 border-solid border-white px-5 py-2 rounded-full text-white text-bold font-[15px] uppercase">
                {currentUser.user.email[0]}
              </p>
            </div>
          </Link>
        ) : (
          <button className="bg-white text-green font rounded-full px-8 py-1 text-[24px] sm:text-[30px] font-bold">
            <Link to="/login">Log In</Link>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header
