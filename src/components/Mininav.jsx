import { Link } from "react-router-dom";
import { FaCheckToSlot } from "react-icons/fa6";
import { BsArrowLeft } from "react-icons/bs";
import { logOut } from "../server/backend";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Mininav({ userType }) {
  const navigate = useNavigate();

  function handleLogout() {
    logOut();
    navigate("/auth");
  }
  return (
    <nav className="relative flex justify-between px-16 py-10 bg-slate-200 ">
      <Link className="absolute flex gap-1 items-center left-12 top-32" to="/">
        <BsArrowLeft className="text-xl" />
        Back to Home
      </Link>

      <div className="flex  gap-2 font-extrabold cursor-pointer">
        <FaCheckToSlot className="text-3xl" />
        <h1 className="logo text-2xl">EVotes</h1>
      </div>

      <div className="flex gap-2 items-center">
        {userType && (
          <p className="bg-gray-400 py-2 px-4 rounded-2xl ">{userType}</p>
        )}

        <button
          className="flex items-center gap-2 border border-slate-300 hover:border-slate-600 cursor-pointer px-4 py-2 rounded-xl"
          onClick={handleLogout}
        >
          <IoLogOutOutline className="text-2xl " />
          <p>Logout</p>
        </button>
      </div>
    </nav>
  );
}

export default Mininav;
