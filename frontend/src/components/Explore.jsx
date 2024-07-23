import React from "react";

const Explore = ({ challengesRef }) => {
  const handleExploreClick = () => {
    if (challengesRef.current) {
      challengesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center py-10">
      <h4 className="text-green font-bold text-[16px] text-center">
        Explore Challenges
      </h4>
      <h1 className="text-black font-bold sm:text-[40px] text-[30px] text-center">
        Prepare Yourself and Let’s <br /> Explore Wonderful Place!
      </h1>
      <p className="text-brown font-regular text-[20px] text-center">
        Want to visit challenges and awesome culture, let’s find that place with
        us.
      </p>
      <button
        className="bg-green text-white text-[24px] rounded-full px-10 py-2 w-fit mt-6"
        onClick={handleExploreClick}
      >
        Explore
      </button>
    </div>
  );
};

export default Explore;
