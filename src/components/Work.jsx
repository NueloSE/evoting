import { FiUserCheck } from "react-icons/fi";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { VscGraphLine } from "react-icons/vsc";


function Work() {
  return (
    <div className="bg-[#e7eeff]">
      <div className="text-center px-4 py-24 max-w-3xl mx-auto ">
        <h2>How SecureVote Works</h2>
        <p className="mt-2 mb-8">
          Our streamlined process makes digital voting simple, secure, and
          transparent for both voters and administrators.
        </p>

        {/* steps for voters */}
        <div>
          <h3>For Voters</h3>
          <p className="mb-6">Simple and secure voting process</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* step one */}
            <div className="step ">
              <div className=" relative w-fit ">
                <FiUserCheck className="text-white bg-black text-xl w-16 h-16 px-4 rounded-full" />
                <p className="absolute -top-2 right-0 rounded-full px-1 border bg-white ">
                  01
                </p>
              </div>
              <h4>Register to Vote</h4>
              <p>
                Complete a simple registration process with secure identity
                verification.
              </p>
            </div>

            {/* step two */}
            <div className="step">
              <div className=" relative w-fit ">
                <LuLaptopMinimalCheck className="text-white bg-black text-xl w-16 h-16 px-4 rounded-full" />
                <p className="absolute -top-2 right-0 rounded-full px-1 border bg-white ">
                  02
                </p>
              </div>
              <h4>Cast Your Vote</h4>
              <p>
                Access your ballot and vote for your preferred candidates
                securely and privately.
              </p>
            </div>
          </div>
        </div>

        {/* steps for organizers */}
        <div className="mt-26">
          <h3>For Organizers</h3>
          <p className="mb-6">Complete election management and control</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* step one */}
            <div className="step ">
              <div className=" relative w-fit ">
                <IoSettingsOutline className="icons bg-[#155dfc]" />
                <p className="number border-[#155dfc] ">01</p>
              </div>
              <h4>Create Election</h4>
              <p>
                Set up new elections with custom ballot options, candidate
                lists, and voting parameters.
              </p>
            </div>

            {/* step two */}
            <div className="step">
              <div className=" relative w-fit ">
                <CiCalendarDate className="icons bg-[#155dfc]" />
                <p className="number border-[#155dfc] ">02</p>
              </div>
              <h4>Schedule Voting Period</h4>
              <p>
                Define election start and end times, set voting windows and
                deadlines.
              </p>
            </div>

            {/* step three */}
            <div className="step">
              <div className=" relative w-fit ">
                <LuUsers className="icons bg-[#155dfc]" />
                <p className="number border-[#155dfc]">03</p>
              </div>
              <h4>Manage Voters</h4>
              <p>
                Add eligible voters, send invitations, and manage voter
                registration.
              </p>
            </div>

            {/* step four */}
            <div className="step">
              <div className=" relative w-fit ">
                <VscGraphLine className="icons bg-[#155dfc]" />
                <p className="number border-[#155dfc]">04</p>
              </div>
              <h4>Monitor & Results</h4>
              <p>
                Track voting progress in real-time and access detailed results
                and analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;
