import React from 'react';
import challengeone from '../images/challengeone.png'

const Challenges = () => {

  const challenges = [
    {
      id: "0",
      name: "Eco-Friendly DIY Projects Challenge In Summer",
      count: "500",
    },
    {
      id: "1",
      name: "Eco-Friendly DIY Projects Challenge In Summer",
      count: "500",
    },
    ,
    {
      id: "2",
      name: "Eco-Friendly DIY Projects Challenge In Summer",
      count: "500",
    },
  ];
  return (
    <div className="px-6 sm:px-10 md:px-16  xl:px-24 flex flex-col gap-7">
      <h4 className="text-green font-bold text-[16px] ">
        Top Challenges
      </h4>
      <h1 className="text-black font-bold sm:text-[40px] text-[30px]  sm:w-4/5 lg:w-1/2">
        Discover Challenges for a Summer Sustainability.
      </h1>
      <div className='grid mx-auto md:justify-between xl:px-10 pt-5 grid-cols-1 md:grid-cols-2  xl:grid-flow-col gap-2 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-12 md:w-full'>
        {challenges.map((challenge) => (
          <div key={challenge.id} className='flex flex-col w-[313px] rounded-lg shadow-2xl'>
            <img src={challengeone} alt="challenge"  className='h-fit w-fit rounded-t-lg rou'/>
            <div className='py-3 flex flex-col gap-4 justify-center px-2'>
              <h1 className='text-[16px] font-bold'>{challenge.name}</h1>
              <div className='flex justify-between '>
                <p className='text-brown text-[12px] font-bold mt-2'>{challenge.count}+ Participants</p>
                <button className='bg-green text-white font-bold text-[14px] rounded-full px-6 py-1'>Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges
