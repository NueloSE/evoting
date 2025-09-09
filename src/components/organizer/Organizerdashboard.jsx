import Mininav from "../Mininav";

import { LuLaptopMinimalCheck } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";
import { BsPeople } from "react-icons/bs";
import { useRef,  } from "react";
import ElectionManagement from "./ElectionManagement";
import Categories from "./Categories";
import Candidate from "./Candidate";
import useStore from "../../server/store";
// import useStore from "../../server/store";
// import { queryDatabase } from "../../server/backend";

function Organizerdashboard() {
  const electionsBtn = useRef(null);
  const categoriesBtn = useRef(null);
  const candidateBtn = useRef(null);

  const electionsComponet = useRef(null);
  const categoriesComponet = useRef(null);
  const candidateComponet = useRef(null);
  const getElectionsData = useStore((state) => state.getElections);


  function displayActivityToManage(selectedActivity) {
    const organizerActivities = [electionsBtn, categoriesBtn, candidateBtn];
    organizerActivities.map((activity) => {
      if (activity == selectedActivity) {
        activity.current.classList.add("active");
      } else {
        activity.current.classList.remove("active");
      }
    });
  }

  function displayCard(card) {
    const cardCategories = [
      electionsComponet,
      categoriesComponet,
      candidateComponet,
    ];

    cardCategories.map(async (category) => {
      if (category == card) {
        category.current.classList.remove("hidden");
        // console.log(await queryDatabase(userObj));
      } else {
        category.current.classList.add("hidden");
      }
    });
  }

  async function handleElectionBtn() {
    displayActivityToManage(electionsBtn);
    displayCard(electionsComponet);
    await getElectionsData();
  }

  function handleCategoriesBtn() {
    displayActivityToManage(categoriesBtn);
    displayCard(categoriesComponet);
  }

  function handleCandidateBtn() {
    displayActivityToManage(candidateBtn);
    displayCard(candidateComponet);
  }

  return (
    <div>
      <div className="sticky top-0">
        <Mininav userType="Organizer" />
      </div>
      {/* page content */}
      <div className="max-w-xl md:max-w-2xl mx-auto">
        <div className="text-center px-4 py-4 max-w-2xl mx-auto ">
          <h2>Organizer Dashboard</h2>
          <p className="mt-2 mb-8">
            Manage your elections, categories, and candidates.
          </p>
        </div>

        {/* select a management to perform */}
        <div className="flex justify-between w-full bg-gray-300 rounded-full  py-1 mb-5">
          <button
            onClick={handleElectionBtn}
            ref={electionsBtn}
            id="sign-in-btn"
            className="flex justify-center items-center gap-2 w-1/2 text-center cursor-pointer  active py-0 mx-1"
          >
            <LuLaptopMinimalCheck />
            Elections
          </button>
          <button
            onClick={handleCategoriesBtn}
            ref={categoriesBtn}
            id="sign-in-btn"
            className="flex justify-center items-center gap-2 w-1/2 text-center cursor-pointer  py-0 mx-1"
          >
            <SiGoogleclassroom />
            Categories
          </button>
          <button
            onClick={handleCandidateBtn}
            ref={candidateBtn}
            id="sign-in-btn"
            className="flex justify-center items-center gap-2 w-1/2 text-center cursor-pointer   py-0 mx-1"
          >
            <BsPeople />
            Candidate
          </button>
        </div>
        {/* the different management types */}

        <div ref={electionsComponet} className="">
          <ElectionManagement />
        </div>

        {/* manage categories  */}
        <div ref={categoriesComponet} className="hidden">
          <Categories />
        </div>

        {/* candidates card*/}
        <div ref={candidateComponet} className="hidden">
          <Candidate />
        </div>
      </div>
    </div>
  );
}
export default Organizerdashboard;
