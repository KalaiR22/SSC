import { Card } from "flowbite-react";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import susfooter from "../images/susfooter.png";
import { useDispatch, useSelector } from "react-redux";
import dashboard from "../images/dashboard.png";
import challicon from "../images/challicon.png";
import challengeone from "../images/challengeone.png";
import signout from "../images/signout.png";
import hi from "../images/hi.png";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export default function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [tab, setTab] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [progressChallenges, setProgressChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const count = progressChallenges?.length + completedChallenges?.length;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);



useEffect(() => {
  const fetchChallenges = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/task/challenge/${currentUser.user.email}`
      );
      const challenges = response.data.challenges;

      const now = new Date();
      const progress = [];
      const completed = [];

      challenges.forEach((challenge) => {
        const createdAt = new Date(challenge.createdAt);
        const daysDifference = (now - createdAt) / (1000 * 60 * 60 * 24);
        if (daysDifference <= 30) {
          progress.push(challenge);
        } else {
          completed.push(challenge);
        }
      });
      
      console.log("Progress Challenges:", progress);
      console.log("Completed Challenges:", completed);

      setProgressChallenges(progress);
      setCompletedChallenges(completed);
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
    }
  };

  fetchChallenges();
}, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleCheck = (taskId, createdAt) => {
    navigate(`/task/${taskId}?createdAt=${createdAt}`);
  };

  return (
    <div className="flex h-screen overflow-hidden border-t-8 border-green">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-t-8 border-green border-r-2 border-r-lightborder transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto pt-4">
          <img src={susfooter} alt="logo" className="h-fit w-fit" />
          <div className="flex items-center justify-center bg-green w-fit px-12 py-1 rounded-lg text-white gap-2 mx-auto mt-12">
            <img src={dashboard} alt="graph" />
            <p className="font-bolg text-[18px]">Dashboard</p>
          </div>
          <Link to="/dashboard">
            <div className="flex items-center justify-center w-full px-10 py-1 rounded-lg text-[#B1B1B1] gap-2 mx-auto mt-5">
              <img src={challicon} alt="challenge" />
              <p className="font-regular text-[18px]">Challenges</p>
            </div>
          </Link>
          <button onClick={handleSignout}>
            <div className="flex items-center justify-center w-full px-10 py-1 rounded-lg text-[#B1B1B1] gap-2 mx-auto mt-5 ml-2">
              <img src={signout} alt="signout" />
              <p className="font-regular text-[18px]">Sign Out</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col ">
        <header className="md:hidden flex bg-green w-full px-12 py-1 rounded-b-lg text-white gap-2 shadow-md p-4 dark:bg-gray-700 sm:justify-start">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 gap-3 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <img src={dashboard} alt="graph" />
            <p className="font-bolg text-[18px]">Dashboard</p>
          </button>
        </header>

        <main className="flex-1 p-4 py-2 sm:ml-64 overflow-y-scroll">
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between w-full">
                <h1 className="text-green lg:text-[64px] md:text-[50px] sm:text-[44px] text-[38px] font-regular">
                  Dashboard
                </h1>
                <p className="text-[#C1C1C1] text-[15px] lg:text-[24px] font-regular mt-5 md:mr-5">
                  {currentUser?.user.email}
                </p>
              </div>

              <div className="text-[48px] flex gap-2 md:gap-7">
                <img src={hi} alt="hi" />
                <h2 className="lg:text-[48px] md:text-[40px] sm:text-[35px] text-[30px] font-medium w-full">
                  Welcome, {currentUser?.user.username}
                </h2>
              </div>
              <p className="text-[#C1C1C1] lg:text-[24px] text-[18px] font-regular">
                Here’s what happening today.
              </p>
            </div>
          </div>

          <div className="my-6 ">
            <h2 className="text-[#444444] lg:text-[48px] md:text-[40px] sm:text-[35px] text-[30px] font-medium">
              Total Revenue
            </h2>
            <div className="mx-auto flex items-center justify-center mt-4">
              <div className="my-3 grid lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
                <Card className="w-[340px] px-7 flex flex-col items-center justify-center">
                  <h1 className="font-medium text-white challengebg w-fit px-10 rounded-lg mx-auto lg:text-[64px] md:text-[50px] sm:text-[44px] text-[38px]">
                    {count}
                  </h1>
                  <p className="text-[#444444] md:text-[28px] sm:text-[24px] text-[20px] lg:text-[32px] font-medium">
                    Total Challenges
                  </p>
                </Card>
                <Card className="w-[340px] px-7 flex flex-col items-center justify-center">
                  <h1 className="lg:text-[64px] md:text-[50px] sm:text-[44px] text-[38px] font-medium text-white challengebg w-fit px-10 rounded-lg mx-auto">
                    {progressChallenges.length}
                  </h1>
                  <p className="text-[#444444] md:text-[28px] sm:text-[24px] text-[20px] lg:text-[32px] font-medium">
                    Progress
                  </p>
                </Card>
                <Card className="w-[340px] px-7 flex flex-col items-center justify-center">
                  <h1 className="lg:text-[64px] md:text-[50px] sm:text-[44px] text-[38px] font-medium text-white challengebg w-fit px-10 rounded-lg mx-auto">
                    {completedChallenges.length}
                  </h1>
                  <p className="text-[#444444] md:text-[28px] sm:text-[24px] text-[20px] lg:text-[32px] font-medium">
                    Completed
                  </p>
                </Card>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[#444444] lg:text-[48px] md:text-[40px] sm:text-[35px] text-[30px] font-medium">
              In Progress
            </h2>
            <div className="mx-auto flex items-center justify-center mt-4">
              {progressChallenges.length === 0 ? (
                <p className="text-[#C1C1C1] text-[18px] lg:text-[24px] font-regular">
                  You have not been assigned any challenges.
                </p>
              ) : (
                <div className="my-3 grid lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
                  {progressChallenges.map((challenge) => (
                    <div
                      key={challenge._id}
                      className="flex flex-col w-[313px] rounded-lg shadow-2xl"
                    >
                      <img
                        src={challengeone}
                        alt="challenge"
                        className="h-fit w-fit rounded-t-lg"
                      />
                      <div className="py-3 flex flex-col gap-4 justify-center px-2">
                        <h1 className="text-[16px] font-bold">
                          {challenge.taskTitle}
                        </h1>
                        <div className="flex justify-between ">
                          <p className="text-brown text-[12px] font-bold mt-2">
                            {`5000`}+ Participants
                          </p>
                          <button
                            className="bg-green text-white font-bold text-[14px] rounded-full px-6 py-1"
                            onClick={() =>
                              handleCheck(challenge.taskId, challenge.createdAt)
                            }
                          >
                            Check
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-[#444444] lg:text-[48px] md:text-[40px] sm:text-[35px] text-[30px] font-medium">
              Completed
            </h2>
            <div className="mx-auto flex items-center justify-center mt-4">
              {completedChallenges.length === 0 ? (
                <p className="text-[#C1C1C1] text-[18px] lg:text-[24px] font-regular">
                  You have not completed any challenges.
                </p>
              ) : (
                <div className="my-3 grid lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
                  {completedChallenges.map((challenge) => (
                    <div
                      key={challenge._id}
                      className="flex flex-col w-[313px] rounded-lg shadow-2xl"
                    >
                      <img
                        src={challengeone}
                        alt="challenge"
                        className="h-fit w-fit rounded-t-lg"
                      />
                      <div className="py-3 flex flex-col gap-4 justify-center px-2">
                        <h1 className="text-[16px] font-bold">
                          {challenge.taskTitle}
                        </h1>
                        <div className="flex justify-between ">
                          <p className="text-brown text-[12px] font-bold mt-2">
                            {`5000`}+ Participants
                          </p>
                          <button
                            className="bg-green text-white font-bold text-[14px] rounded-full px-6 py-1"
                            onClick={() =>
                              handleCheck(challenge._id, challenge.createdAt)
                            }
                          >
                            Check
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
