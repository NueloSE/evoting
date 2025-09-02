import { TiArrowRight } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";

function Ready() {
  return (
    <div class="bg-linear-to-r/srgb from-[#050420] to-[#16319b] text-slate-50 py-24 px-6">
      <div px-4 py-24 max-w-4xl mx-auto>
        <div className="text-center space-y-4">
          <h2 className="text-slate-50">Ready to Transform Your Elections?</h2>
          <p className="max-w-lg mx-auto">
            Join thousands of organizations worldwide who trust Evotes for their
            most important decisions.
          </p>

          <button className="btn  flex items-center w-fit text-black mx-auto  mt-6 mb-16 bg-slate-200 hover:bg-opacity-30">
            Login/Sign Up <TiArrowRight className="text-xl mt-1" />
          </button>

          <ul className="flex flex-col items-center justify-center md:flex-row gap-6">
            <li className="flex items-center gap-2">
              <FaCheck />
              No setup fees
            </li>
            <li className="flex items-center gap-2">
              <FaCheck />
              24/7 support
            </li>
            <li className="flex items-center gap-2">
              <FaCheck />
              99.9% uptime guarantee
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Ready;
