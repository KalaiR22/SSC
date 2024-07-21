import React from 'react'
import taskimg from '../images/taskimg.png'
import calender from "../images/calender.png";
import {Link} from 'react-router-dom';
import susfooter from '../images/susfooter.png'
import sm from '../images/sm.png'
const DailyTask = () => {
  return (
    <div className="px-6 sm:px-10 md:px-16  xl:px-24">
      <div className=" mt-16">
        <p className="font-regular text-white bg-green  lg:text-[32px] md:text-[28px] sm:text-[23px] text-[20px] w-fit px-3 rounded-lg">
          MonthlyChallenge
        </p>
        <div className="flex  gap-3 shadow-2xl py-4 rounded-lg  md:px-4 items-center flex-col lg:flex-row">
          <div className="relative mr-20">
            <p className=" text-[33px] font-bold absolute z-10 ml-8  top-1/3 mt-6 ">
              DAY 1
            </p>
            <img src={calender} alt="calender" className="relative" />
          </div>

          <div className="w-5/6 py-4  flex ">
            <div>
              <p className="text-green font-medium lg:text-[32px] md:text-[25px] sm:text-[22px] text-[20px]">
                Prompt
              </p>
              <p className="text-black font-regular lg:text-[32px] md:text-[25px] sm:text-[22px] text-[20px]">
                Take a today newspaper and do a paper stand for pens and
                stationary activities.
              </p>
              <p className="text-[16px] font-regular">
                Reference: Prefer and click this{" "}
                <a href="" className="text-[#0038FF]">
                  video
                </a>{" "}
                for your today’s work
              </p>
            </div>

            <img
              src={taskimg}
              alt="task"
              className="w-20 h-20 sm:h-fit sm:w-fit ml-2"
            />
          </div>
        </div>
      </div>
      <div className="font-bold text-[40px] text-center w-full my-28">
        Are you completed a task?
      </div>
      <div className="relative sm:w-2/3 p-10 lg:px-20 md:px-14 sm:px-10 px-5 flex flex-col shadow-2xl mx-auto mb-28  rounded-lg">
        <img
          src={susfooter}
          className="h-fit w-fit  mx-auto  "
        />
        <p className="font-regular text-[24px] ">
          Happy to hear you for joining in ssc challenge, Your prompt in reach
          you in SMS and website. Continue your work and share a work in social
          media with smile.
        </p>
        <p className="font-regular text-[32px] text-right ">-SSC</p>
      </div>
      <img src={sm} alt="" className='absolute right-0 top-2/3'/>
    </div>
  );
}

export default DailyTask
