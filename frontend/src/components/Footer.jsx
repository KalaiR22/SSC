import React from 'react'
import susfooter from '../images/susfooter.png'

const Footer = () => {
  return (
    <div className=" w-full  flex justify-between items-center px-6 sm:px-10 md:px-16  xl:px-24 mt-16 border border-t-grey ">
      <img src={susfooter} alt="" className="sm:h-20 h-14 sm:w-fit w-32 mt-3" />
      <p className='text-brown font-regular text-[15px] sm:text-[20px]'>@All Rights Received</p>
    </div>
  );
}

export default Footer
