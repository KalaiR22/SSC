import React from 'react'
import serviceone from '../images/serviceone.png'
import servicetwo from "../images/servicetwo.png";
import servicethree from "../images/servicethree.png";

const Service = () => {
  return (
    <div className="flex  flex-col lg:flex-row py-24 px-6 sm:px-10 md:px-16  xl:px-24 justify-between gap-20 xl:gap-28 2xl:gap-36 ">
      <div className="lg:w-1/3 flex flex-col gap-2">
        <h4 className="text-green font-bold text-[16px]">What we serve</h4>
        <h1 className="text-black font-bold sm:text-[40px] text-[30px]">
          Our Best <br /> Service
        </h1>
        <p className="text-brown font-regular text-[20px]">
          To effectively carry out a Summer Sustainability Challenge, utilizing
          the best available services and tools can significantly enhance the
          experience for participants.
        </p>
      </div>
      <div className="flex gap-3 sm:gap-0 sm:justify-between lg:w-2/3">
        <div className="md:w-[200px] pt-24 flex flex-col gap-1">
          <img src={serviceone} alt="service" />
          <h3 className="text-black font-bold text-[20px] text-center">
            Updates
          </h3>
          <p className="text-brown font-regular text-[16px]">
            For sending weekly emails with tips, resources, and messages.
          </p>
        </div>
        <div className="md:w-[170px] flex flex-col gap-1">
          <img src={servicetwo} alt="service" />
          <h3 className="text-black font-bold text-[20px] text-center">
            Resource Sharing
          </h3>
          <p className="text-brown font-regular text-[16px]">
            For sharing documents and other resources with participants.
          </p>
        </div>
        <div className="md:w-[170px] pt-24 flex flex-col gap-1">
          <img src={servicethree} alt="service" />
          <h3 className="text-black font-bold text-[20px] text-center">
            Solutions
          </h3>
          <p className="text-brown font-regular text-[16px]">
            For finding and promoting eco-friendly and upcycled products.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Service
