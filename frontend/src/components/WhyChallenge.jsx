import React from "react";
import holiday from '../images/holiday.png'

const WhyChallenge = () => {
  return (
    <div className="flex  flex-col lg:flex-row py-24 px-6 sm:px-10 md:px-16  xl:px-24 justify-between gap-20 xl:gap-28 2xl:gap-36 ">
      <div className="flex flex-col gap-6 lg:w-2/5 lg:pt-7">
        <h4 className="text-green font-bold text-[16px]">
          Why Challenge With Us
        </h4>
        <h1 className="text-black font-bold sm:text-[40px] text-[30px]">
          Our Holiday Have Never Been This Fun!
        </h1>
        <p className="text-brown font-regular text-[20px]">
          Adopting a challenge-based approach for a summer sustainability
          project can bring numerous benefits and greater engagement and impact.
        </p>
      </div>
      <div className="lg:w-2/5 mx-auto">
        <img
          src={holiday}
          alt="holiday"
          className="items-center justify-center"
        />
      </div>
    </div>
  );
};

export default WhyChallenge;
