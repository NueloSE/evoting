import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import useStore from "../../server/store";
import DeleteElectionToast from "./DeleteElectionToast";

function ElectionManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const elections = useStore((state) => state.electionsObj);
  const createNewElection = useStore((state) => state.createNewElection);


  const [newElectionTitle, setNewElectionTitle] = useState("");
  const [newElectionDescription, setNewElectionDescription] = useState("");

  const [idToDelete, setIdToDelete] = useState(null);
  const [isDeleteToast, setIsDeleteToast] = useState(false);

  const handleCreateNewElection = async (e) => {
    e.preventDefault();
    if (!newElectionTitle.trim() || !newElectionDescription.trim()) {
      alert("Please provide both name and description");
      return;
    }

    await createNewElection({
      title: newElectionTitle,
      description: newElectionDescription,
      candidates: [],
      categories: [],
    });

    setNewElectionTitle("");
    setNewElectionDescription("");
    setIsModalOpen(!isModalOpen);
  };

  function showHideDeleteToast(id) {
    setIdToDelete(id);
    setIsDeleteToast(!isDeleteToast);
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-8 ">
          <h3>Elections Management</h3>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="text-slate-50 bg-slate-800 px-4 py-2 rounded-lg cursor-pointer"
          >
            + Create Election
          </button>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="absolute bg-slate-200 p-10 rounded-2xl">
            <div className="relative">
              <div className="absolute right-4 text-slate-800">
                <IoCloseCircleOutline
                  className="text-xl cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <h4>Create New Election</h4>
              <p className="w-lg">
                Create a new election. You'll be able to add categories and
                candidates after creation.
              </p>
              <form onSubmit={(e) => handleCreateNewElection(e)}>
                <div>
                  <label htmlFor="title">Election Title</label>
                  <input
                    type="text"
                    placeholder="Enter election title"
                    className="bg-slate-50"
                    value={newElectionTitle}
                    onChange={(e) => setNewElectionTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="title">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Enter election description"
                    className="w-full bg-slate-50 p-4 rounded-lg "
                    rows={5}
                    onChange={(e) => setNewElectionDescription(e.target.value)}
                    value={newElectionDescription}
                  ></textarea>
                </div>

                <div className="flex gap-2 justify-end mt-4">
                  <button
                    className="btn pry-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn sec-btn">
                    Create Election
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* pull data from storage and pollate static field */}
        <div className="flex flex-col gap-4">
          {Object.keys(elections).length === 0 ? (
            <p>Loading...</p>
          ) : (
            Object.entries(elections).map(([key, value]) => (
              <div
                key={key}
                className="px-8 border border-slate-300 rounded-xl"
              >
                {/* election title/status */}
                <div className="flex justify-between items-center ">
                  <h4>{value.title}</h4>
                  <p className="draft status">Draft</p>
                </div>

                <p className="text-slate-500 max-w-2/3 pb-6">
                  {value.description}
                </p>

                <ul className="pb-6 space-y-3">
                  <li className="flex justify-between text-slate-500 ">
                    <span>ElectionID:</span>
                    <span className="bg-slate-400/25 p-1 rounded-md text-sm ">
                      ELC001
                    </span>
                  </li>
                  <li className="flex justify-between text-slate-500">
                    <span>Categories:</span>
                    <span>{value.categories.length}</span>
                  </li>
                  <li className="flex justify-between text-slate-500">
                    <span>Total Candidates:</span>{" "}
                    <span>{value.candidates.length}</span>
                  </li>
                </ul>

                {/* election control btn */}
                <div className="flex items-center justify-between pb-8 ">
                  <div className="flex gap-4 ">
                    <button className="flex items-center gap-1 border-slate-40 border rounded-lg px-2 ">
                      <MdOutlineRemoveRedEye className="mt-1" /> view
                    </button>
                    <button className="bg-slate-700 text-slate-50 px-2 rounded-lg">
                      Start Registration
                    </button>
                    <button className="bg-slate-700 text-slate-50 px-2 rounded-lg">
                      Start Voting
                    </button>
                  </div>
                  <RiDeleteBin6Line
                    className="text-red-500 border text-2xl rounded-sm p-1 cursor-pointer"
                    onClick={() => showHideDeleteToast(value.id)}
                  />
                </div>
                <div
                  className={`fixed  bg-slate-50 top-1/2 w-1/2  p-4 ${
                    isDeleteToast ? "" : "hidden"
                  }`}
                >
                  <DeleteElectionToast
                    electionName={idToDelete}
                    onClose={() => setIsDeleteToast(false)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ElectionManagement;
