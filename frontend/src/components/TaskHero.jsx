import React from 'react'
import taskhero from '../images/taskhero.png';
import arrow from "../images/arrow.png";
import laptop from "../images/laptop.png";
import tick from "../images/tick.png";

const TaskHero = () => {
  return (
    <div className="mt-24  sm:pt-10 mx-auto flex flex-col gap-2 justify-center items-center px-6 sm:px-10 md:px-16  xl:px-24 w-full">
      <h1 className="font-bold text-[35px] sm:text-[42px] md:text-[50px] lg:text-[64px] text-black text-center">
        CHALLENGE YOURSELF IN <br /> SUMMER FOR{" "}
        <span className="text-green">SUSTAINABILITY</span>
      </h1>
      <p className="text-brown lg:text-[40px] md:text-[35px]  sm:text-[28px] text-[23px] text-center">
        Its never too late to be your best self
      </p>
      <div className="flex flex-col mt-4">
        <div className="flex items-center justify-center w-full gap-5">
          <img src={taskhero} alt="task" />
        </div>
        <div className="flex justify-between">
          <p className="lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-regular text-center  ">
            Pick a task
          </p>
          <p className="lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-regular text-center items-end ml-10">
            Complete
          </p>
          <p className="lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-regular text-center">
            Share on <br /> social media
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskHero
