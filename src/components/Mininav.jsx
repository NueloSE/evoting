import { Link } from "react-router-dom";
import { FaCheckToSlot } from "react-icons/fa6";
import { BsArrowLeft } from "react-icons/bs";

function Mininav() {
  return (
    <nav className="relative py-10 bg-slate-200">
      <Link className="absolute flex gap-4 items-center left-12" to="/">
        <BsArrowLeft className="text-2xl" />
        Back to Home
      </Link>

      <div className="flex justify-center gap-2 cursor-pointer">
        <FaCheckToSlot className="text-2xl" />
        <h1 className="logo">EVotes</h1>
      </div>
    </nav>
  );
}

export default Mininav;
