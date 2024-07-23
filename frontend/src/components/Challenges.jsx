import React, { useEffect, useState } from "react";
import axios from "axios";
import challengeone from "../images/challengeone.png";
import { IoChevronBackSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/user/userSlice";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/task/allchallenge"
        );
        const fetchedChallenges = Array.isArray(response.data)
          ? response.data
          : [];
        setChallenges(fetchedChallenges);
      } catch (err) {
        console.error("Error fetching challenges:", err);
        setError("Failed to fetch challenges");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleJoinClick = (challenge) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedChallenge(null);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

 const handleJoinChallenge = async () => {
   if (!isChecked) {
     alert("You must agree to the privacy policy and terms of use");
     return;
   }

   if (!selectedChallenge || !currentUser) {
     alert("Invalid challenge or user information.");
     return;
   }

   const requestBody = {
     taskId: selectedChallenge._id,
     userId: currentUser.user._id,
     taskTitle: selectedChallenge.name,
   };

   try {
     const response = await axios.post(
       "http://localhost:3000/api/task/addChallenge",
       requestBody
     );

     if (response.data.success) {
       dispatch(updateUser(response.data.user));
       alert("Successfully joined the challenge!");
       handleCloseModal();
       navigate('/dashboard')
     } else {
       alert(response.data.message || "Failed to join the challenge.");
     }
   } catch (err) {
     console.error(err);
     alert(
       `An error occurred: ${
         err.response?.data?.message ||
         "An error occurred while joining the challenge."
       }`
     );
   }
 };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-6 sm:px-10 md:px-16 xl:px-24 flex flex-col gap-7">
      <h4 className="text-green font-bold text-[16px]">Top Challenges</h4>
      <h1 className="text-black font-bold sm:text-[40px] text-[30px] sm:w-4/5 lg:w-1/2">
        Discover Challenges for a Summer Sustainability.
      </h1>
      <div className="grid mx-auto md:justify-between pt-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:w-full">
        {challenges.map((challenge) => (
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
              <h1 className="text-[16px] font-bold">{challenge.name}</h1>
              <div className="flex justify-between ">
                <p className="text-brown text-[12px] font-bold mt-2">
                  {`5000`}+ Participants
                </p>
                <button
                  onClick={() => handleJoinClick(challenge)}
                  className="bg-green text-white font-bold text-[14px] rounded-full px-6 py-1"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg relative px-10 flex flex-col gap-2">
            <button
              onClick={handleCloseModal}
              className="absolute top-8 left-2 text-gray-500 hover:text-gray-700"
            >
              <IoChevronBackSharp className="text-[32px]" />
            </button>
            <h1 className="font-regular text-[32px]">Hi,</h1>
            <h2 className="font-regular text-[24px]">
              Welcome to the {selectedChallenge?.name} challenge! Make this
              holiday enjoyable and useful. We are eager to provide this
              challenge and spread sustainability in the world.
            </h2>
            <p className="font-regular text-[32px] text-right">-SSC</p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="agree" className="font-regular text-[13px]">
                By accepting this challenge, you agree to our{" "}
                <span className="text-[#2958FE]">privacy policy</span> and{" "}
                <span className="text-[#2958FE]">terms of use</span>
              </label>
            </div>
            <button
              onClick={handleJoinChallenge}
              className="bg-green text-white px-10 py-1 rounded-full text-[24px] font-regular items-center mt-3 mx-auto"
            >
              Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
