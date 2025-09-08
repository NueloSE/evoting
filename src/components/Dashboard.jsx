import Mininav from "./Mininav";
import Footer from "./Footer";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { BsClock } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../server/store";
// import { queryDatabase } from "../server/backend";

function Dashboard() {
  const navigate = useNavigate();
  const getElectionsData = useStore((state) => state.getElections);

  const [organizerId, setOrganizerId] = useState("");

  async function handleContinueAsOrganizer() {
    await getElectionsData();

    navigate("/organizerdashboard");
  }

  return (
    <div className="flex flex-col justify-between  min-h-screen ">
      <div className="sticky top-0">
        <Mininav />
      </div>
      <div className="flex flex-col items-center mb-24">
        <div className="text-center px-4 py-24 max-w-2xl mx-auto ">
          <h2>Choose Your Role</h2>
          <p className="mt-2 mb-8">
            EVotes serves two distinct user types. Please select the role that
            best describes your purpose on the platform.
          </p>
        </div>

        <div>
          <div className="flex flex-col lg:flex-row mx-6 gap-6 lg:max-w-4xl">
            {/* Organizer */}
            <div className=" max-w-md mx-auto border-2 border-slate-300 rounded-2xl p-6 hover:shadow-2xl hover:border-slate-400">
              {/* heading */}
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <div className="bg-gray-300 rounded-lg p-2">
                      <IoSettingsOutline className="text-3xl" />
                    </div>
                    <h3 className="text-xl">
                      Election Organizer
                      <span className="block font-normal text-sm">
                        Create & Manage Elections
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center bg-blue-200/50 text-blue-600 px-2 space-x-2  border rounded-xl text-xs py-0.5">
                    <IoSettingsOutline />
                    <p>Admin Access</p>
                  </div>
                </div>
              </div>

              <div className="lg:min-h-[495px]">
                <p className="mt-12 mb-6 lg:max-w-2xl">
                  As an Election Organizer, you have full administrative control
                  over the electoral process. You can create, configure, and
                  monitor elections with comprehensive management tools.
                </p>

                <h4>Key Capabilities</h4>
                <ul>
                  <li className="flex items-center gap-2">
                    <IoMdCheckmarkCircleOutline className="text-green-600" />
                    <p>Create and configure new elections</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IoMdCheckmarkCircleOutline className="text-green-600" />
                    <p>Set voting periods and deadlines</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IoMdCheckmarkCircleOutline className="text-green-600" />
                    <p>Manage voter registeration and access</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IoMdCheckmarkCircleOutline className="text-green-600" />
                    <p>Monitor real-time voting progress</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IoMdCheckmarkCircleOutline className="text-green-600" />
                    <p>Generate comprehensive election reports</p>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleContinueAsOrganizer}
                className="flex items-center bg-slate-800 text-slate-50 w-full justify-center py-4 rounded-lg gap-2 cursor-pointer my-4"
              >
                <p>Continue as Organizer</p>
                <FaArrowRight />
              </button>
            </div>

            {/* Voter */}
            <div className="max-w-md mx-auto border-2 border-slate-300 rounded-2xl p-6 hover:shadow-2xl hover:border-slate-400">
              {/* heading */}
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <div className="bg-green-300 text-green-700 rounded-lg p-2">
                      <LuLaptopMinimalCheck className="text-3xl" />
                    </div>
                    <h3 className="text-xl">
                      Voter
                      <span className="block font-normal text-sm">
                        Participate in Elections
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center bg-green-200/50 text-green-600 px-2 space-x-2  border rounded-xl text-xs py-0.5">
                    <LuLaptopMinimalCheck />
                    <p>Voter Access</p>
                  </div>
                </div>
              </div>

              <p className="mt-12 mb-6 lg:max-w-2xl">
                As an Voter, you can participate in elections organized by
                administrators. Access your assigned elections, cast your votes
                securely, and track your participation.
              </p>

              <h4>Key Capabilities</h4>
              <ul>
                <li className="flex items-center gap-2">
                  <IoMdCheckmarkCircleOutline className="text-green-600" />
                  <p>Access elections you're eligible for</p>
                </li>
                <li className="flex items-center gap-2">
                  <IoMdCheckmarkCircleOutline className="text-green-600" />
                  <p>Cast secure and anonymous votes</p>
                </li>
                <li className="flex items-center gap-2">
                  <IoMdCheckmarkCircleOutline className="text-green-600" />
                  <p>View election information and candidates</p>
                </li>
                <li className="flex items-center gap-2">
                  <IoMdCheckmarkCircleOutline className="text-green-600" />
                  <p>Verify your vote was counted</p>
                </li>
                <li className="flex items-center gap-2">
                  <IoMdCheckmarkCircleOutline className="text-green-600" />
                  <p>View election results after voting closes</p>
                </li>
              </ul>
              {/* access requirement */}
              <div className="flex gap-4 bg-amber-200/30 px-3 pb-3 rounded-2xl">
                <BsClock className="text-3xl mt-3 text-amber-700" />
                <div className="flex flex-col ">
                  <h4 className="mb-0 text-amber-900">Access Requirement</h4>
                  <p className="text-amber-700 lg:max-w-2xl">
                    To participate in elections, you need an Organizer ID
                    provided by the election administrator who invited you to
                    vote.
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="organizer-id">Organizer ID</label>
                <input
                  type="text"
                  placeholder="Enter the Organizer ID (e.g., ORG-12345)"
                  onChange={(e) => setOrganizerId(e.target.value)}
                />
                <p className="text-sm mt-1 text-slate-400">
                  This ID was provided by your election administrator
                </p>
              </div>
              <button
                disabled={organizerId == "" ? true : false}
                type="button"
                className="flex items-center border border-slate-300 w-full justify-center py-4 rounded-lg gap-2 cursor-pointer my-4"
                onClick={() => console.log(organizerId)}
              >
                <p>Continue as Voter</p>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* help choosing */}
        <div className="bg-gray-400/20 rounded-xl p-8 mt-16 ">
          <h4 className="text-center">Need Help Choosing?</h4>

          <div className="flex justify-between gap-16">
            <div>
              <h5 className="text-center font-bold">Choose Organizer if:</h5>
              <ul className="list-disc">
                <li>You need to create and manage elections</li>
                <li>You're representing an organization</li>
                <li>You need administrative controls</li>
              </ul>
            </div>

            <div>
              <h5 className="text-center font-bold">Choose Voter if:</h5>
              <ul className="list-disc">
                <li>You were invited to participate in an election</li>
                <li>You have an Organizer ID from an administrator</li>
                <li>You want to cast votes in existing elections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
