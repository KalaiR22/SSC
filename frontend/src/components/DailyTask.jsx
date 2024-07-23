import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import taskimg from "../images/taskimg.png";
import calender from "../images/calender.png";
import susfooter from "../images/susfooter.png";
import sm from "../images/sm.png";

const DailyTask = () => {
  const { taskId } = useParams(); // Get the task ID from the URL
  const location = useLocation(); // Get the location object
  const [challenge, setChallenge] = useState(null);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const createdAt = urlParams.get("createdAt"); // Extract the createdAt parameter

    // Function to fetch challenges
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/task/allchallenge"
        );

        // Ensure that response.data is an array of challenges
        const fetchedChallenges = Array.isArray(response.data)
          ? response.data
          : [];

        // Find the challenge that matches the task ID
        const matchedChallenge = fetchedChallenges.find(
          (challenge) => challenge._id === taskId
        );

        if (matchedChallenge) {
          setChallenge(matchedChallenge);

          // Calculate the number of days since the challenge was created
          const createdDate = new Date(createdAt);
          const currentDate = new Date();
          const timeDiff = currentDate - createdDate;
          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
           console.log(daysDiff)
          if (daysDiff > 30) {
            setCompleted(true);
          } else {
            const matchedTask = matchedChallenge.tasks.find(
              (task) => task.id === String(daysDiff + 1) // Convert daysDiff + 1 to string
            );
            setTask(matchedTask || null);
          }
        }
      } catch (err) {
        console.error("Error fetching challenges:", err); // Log the error for debugging
        setError("Failed to fetch challenge");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [taskId, location.search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-6 sm:px-10 md:px-16 xl:px-24">
      {completed ? (
        <div className="font-bold text-[40px] text-center w-full my-28">
          You have completed the 30-day challenge successfully!
        </div>
      ) : task ? (
        <div className="mt-16">
          <p className="font-regular text-white bg-green lg:text-[32px] md:text-[28px] sm:text-[23px] text-[20px] w-fit px-3 rounded-lg">
            Monthly Challenge
          </p>
          <div className="flex gap-3 shadow-2xl py-4 rounded-lg md:px-4 items-center flex-col lg:flex-row">
            <div className="relative mr-20">
              <p className="text-[33px] font-bold absolute z-10 ml-8 top-1/3 mt-6 ">
                DAY {task.id}
              </p>
              <img src={calender} alt="calendar" className="relative" />
            </div>

            <div className="w-5/6 py-4 flex justify-between ">
              <div>
                <p className="text-green font-medium lg:text-[32px] md:text-[25px] sm:text-[22px] text-[20px]">
                  Prompt
                </p>
                <p className="text-black font-regular lg:text-[32px] md:text-[25px] sm:text-[22px] text-[20px]">
                  {task.title}
                </p>
                <p className="text-[16px] font-regular">
                  Reference: Prefer and click this{" "}
                  <a href={task.videoUrl} className="text-[#0038FF]">
                    video
                  </a>{" "}
                  for your today’s work
                </p>
              </div>

              <img
                src={task.imageUrl || taskimg}
                alt="task"
                className="w-20 h-20 sm:h-[200px] sm:w-[200px] ml-2 rounded-lg"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="font-bold text-[40px] text-center w-full my-28">
          You have completed the 30-day challenge successfully!
        </div>
      )}
      <div className="relative sm:w-2/3 p-10 lg:px-20 md:px-14 sm:px-10 px-5 flex flex-col shadow-2xl mx-auto mb-28 rounded-lg mt-24">
        <img src={susfooter} className="h-fit w-fit mx-auto" />
        <p className="font-regular text-[24px]">
          Happy to hear you for joining in ssc challenge, Your prompt in reach
          you in SMS and website. Continue your work and share a work in social
          media with smile.
        </p>
        <p className="font-regular text-[32px] text-right">-SSC</p>
      </div>
      <img src={sm} alt="" className="absolute right-0 top-2/3" />
    </div>
  );
};

export default DailyTask;
