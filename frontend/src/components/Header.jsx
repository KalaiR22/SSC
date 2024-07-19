import React from 'react'
import sustain from '../images/sustain.png'

const Header = () => {
  return (
    <div className="relative z-50 ">
      <div className="bg-green w-full  fixed flex justify-between items-center px-6 sm:px-10 md:px-16  xl:px-24 mt-0">
        <img src={sustain} alt="" className="sm:h-20 h-14 sm:w-fit w-32 mt-3" />
        <button className="bg-white text-green font rounded-full px-8 py-1 text-[24px] sm:text-[30px] font-bold">
          {" "}
          Log In
        </button>
      </div>
    </div>
  );
}

export default Header
