import React from 'react'
import hero from '../images/hero.png'

const Hero = () => {
  return (
    <div className="mt-28  sm:mt-32 lg:mt-40 px-6 sm:px-10 md:px-16  xl:px-24 flex flex-col gap-12  lg:flex-row justify-between">
      <div className="lg:w-1/2 flex flex-col gap-8  sm:py-20">
        <h1 className="font-bold sm:text-[38px] text-[34px] text-black  sm:w-2/3">
          Summer Challenge with Sustainability to improve our World!!!
        </h1>
        <p className="font-regular sm:text-[30px] text-[27px] text-brown">
          Creating a comprehensive summer sustainability challenge can be an
          engaging and impactful way to promote eco-friendly habits.
        </p>
        <button className="font-medium sm:text-[25px] text-[22px] bg-green text-white rounded-md px-10 py-2  w-fit">
          Explore Now
        </button>
      </div>
      <div className="flex items-center justify-center px-10 sm:px-0">
        <img src={hero} alt="hero" />
      </div>
    </div>
  );
}

export default Hero
