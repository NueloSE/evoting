import { RiDeleteBin6Line } from "react-icons/ri";

function Categories() {
  return (
    <div>
      <div className="md:max-w-full">
        <div className="flex flex-wrap sm:flex-nowrap  justify-between items-center gap-4 p-2">
          <h4>Categories Management</h4>
          <select name="" id="">
            <option value="" selected disabled>
              Select an election
            </option>
            <option value="">Student Council Elections 2024</option>
            <option value="">Department Head Elections</option>
          </select>
          <div>
            <button className="text-slate-50 bg-slate-800 px-2 py-1 rounded-lg">
              + Add Category
            </button>
          </div>
        </div>

        {/* category  cards */}
        <div className="border border-slate-300 p-4 rounded-xl">
          <div>
            {/* title */}
            <div className="flex gap-2 justify-between px-2">
              <div>
                <h5 className="font-bold">President</h5>
                <p>Student Council President position</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="border border-slate-300 px-2 rounded-md">
                  2 candidates
                </p>
                <div className="border border-slate-300 rounded-md">
                  <RiDeleteBin6Line className="m-1.5  text-xl text-red-500" />
                </div>
              </div>
            </div>
            {/* candidates */}
            <div className="mt-8 px-2 space-y-2">
              {/* candidate 1 */}
              <div className="flex justify-between items-center gap-2 bg-slate-300/30 p-4 rounded-lg">
                <div>
                  <h5 className="font-bold">Alice Johnson</h5>
                  <p className="text-sm py-0.5">
                    3rd year Business student with leadership experience
                  </p>
                  <p className="text-xs border border-slate-300 font-bold p-1 w-fit rounded-sm">
                    Progressive Student Alliance
                  </p>
                </div>

                <RiDeleteBin6Line className=" text-xl text-red-500" />
              </div>

              {/* candidate 2 */}
              <div className="flex justify-between items-center gap-2 bg-slate-300/30 p-4 rounded-lg">
                <div>
                  <h5 className="font-bold">Alice Johnson</h5>
                  <p className="text-sm py-0.5">
                    3rd year Business student with leadership experience
                  </p>
                  <p className="text-xs border border-slate-300 font-bold p-1 w-fit rounded-sm">
                    Progressive Student Alliance
                  </p>
                </div>

                <RiDeleteBin6Line className=" text-xl text-red-500" />
              </div>
            </div>

            <button className="border border-slate-300 py-1 w-full mt-4 rounded-md hover:bg-slate-400/10 cursor-pointer">
              + Add Candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
