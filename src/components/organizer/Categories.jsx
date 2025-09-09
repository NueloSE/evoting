import { RiDeleteBin6Line } from "react-icons/ri";
import useStore from "../../server/store";
import { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
// import { loadCategories } from "../../server/backend";

function Categories() {
  const elections = useStore((state) => state.electionsObj);
  const categoriesObj = useStore((state) => state.categoriesObj);
  const loadCategories = useStore((state) => state.loadCategories);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const createCategory = useStore((state) => state.createCategory);
  const deleteCategory = useStore((state) => state.deleteCategory);
  const createCandidate = useStore((state) => state.createCandidate);
  const deleteCandidate = useStore((state) => state.deleteCandidate);

  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedElection, setSelectedElection] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCandidateName, setNewCandidateName] = useState("");
  const [newCandidateDescription, setNewCandidateDescription] = useState("");
  const [newCandidateParty, setNewCandidateParty] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  function handleCreateNewCategory(e) {
    e.preventDefault();
    if (!newCategoryName.trim() || !newCategoryDescription.trim()) {
      alert("Please provide both category name and description");
      return;
    }
    createCategory(selectedElection, {
      title: newCategoryName,
      description: newCategoryDescription,
    }).then((result) => {
      if (result.error) {
        alert(result.error);
      } else {
        setNewCategoryName("");
        setNewCategoryDescription("");
        setIsAddCategoryOpen(false);
        loadCategories(selectedElection); // Optional reload for consistency
      }
    });
  }

  function handleDeleteCandidate(categoryId, candidateId) {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      deleteCandidate(selectedElection, categoryId, candidateId).then(
        (result) => {
          if (result.error) {
            alert(result.error);
          } else {
            loadCategories(selectedElection);
          }
        }
      );
    }
  }

  function handleDeleteCategory(categoryId) {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(selectedElection, categoryId).then((result) => {
        if (result.error) {
          alert(result.error);
        } else {
          loadCategories(selectedElection); 
        }
      });
    }
  }

  function handleCreateNewCandidate(e) {
    e.preventDefault();
    if (
      !newCandidateName.trim() ||
      !newCandidateDescription.trim() ||
      !newCandidateParty.trim()
    ) {
      alert("Please provide name, description, and party");
      return;
    }
    createCandidate(selectedElection, selectedCategoryId, {
      name: newCandidateName,
      description: newCandidateDescription,
      party: newCandidateParty,
    }).then((result) => {
      if (result.error) {
        alert(result.error);
      } else {
        setNewCandidateName("");
        setNewCandidateDescription("");
        setNewCandidateParty("");
        setIsAddCandidateOpen(false);
        loadCategories(selectedElection); 
      }
    });
  }

  useEffect(() => {
    if (selectedElection) {
      loadCategories(selectedElection);
    }
  }, [selectedElection, loadCategories]);

  const categories = selectedElection
    ? categoriesObj[selectedElection] || []
    : [];

  return (
    <div>
      <div className="md:max-w-full">
        <div className="flex flex-wrap sm:flex-nowrap  justify-between items-center gap-4 p-2">
          <h4>Categories Management</h4>
          <select
            name="selectedElection"
            onChange={(e) => setSelectedElection(e.target.value)}
            id=""
          >
            <option value="" selected disabled>
              Select an election
            </option>
            {Object.entries(elections).map(([key, value]) => (
              <option value={key} key={key}>
                {value.title}
              </option>
            ))}
          </select>
          <div>
            <button
              onClick={() => setIsAddCategoryOpen(!isAddCategoryOpen)}
              className="text-slate-50 bg-slate-800 px-2 py-1 rounded-lg"
            >
              + Add Category
            </button>
          </div>
        </div>

        {isAddCategoryOpen && (
          <div className="absolute bg-slate-200 p-10 rounded-2xl">
            <div className="relative">
              <div className="absolute right-4 text-slate-800">
                <IoIosCloseCircleOutline
                  className="text-xl cursor-pointer"
                  onClick={() => setIsAddCategoryOpen(false)}
                />
              </div>
              <h4>Create New Election</h4>
              <p className="w-lg">
                Create a new category for candidates to compete in.
              </p>
              <form onSubmit={(e) => handleCreateNewCategory(e)}>
                <div>
                  <label htmlFor="title">Category Name</label>
                  <input
                    type="text"
                    placeholder="Enter category Name"
                    className="bg-slate-50"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="title">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Enter category description"
                    className="w-full bg-slate-50 p-4 rounded-lg "
                    rows={5}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    value={newCategoryDescription}
                  ></textarea>
                </div>

                <div className="flex gap-2 justify-end mt-4">
                  <button
                    className="btn pry-btn"
                    onClick={() => setIsAddCategoryOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn sec-btn">
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isAddCandidateOpen && (
          <div className="absolute bg-slate-200 p-10 rounded-2xl">
            <div className="relative">
              <div className="absolute right-4 text-slate-800">
                <IoIosCloseCircleOutline
                  className="text-xl cursor-pointer"
                  onClick={() => setIsAddCandidateOpen(false)}
                />
              </div>
              <h4>Add New Candidate</h4>
              <p className="w-lg">
                Add a new candidate to the selected category.
              </p>
              <form onSubmit={(e) => handleCreateNewCandidate(e)}>
                <div>
                  <label htmlFor="candidateName">Name</label>
                  <input
                    type="text"
                    id="candidateName"
                    placeholder="Enter candidate name"
                    className="bg-slate-50 w-full p-2 rounded"
                    value={newCandidateName}
                    onChange={(e) => setNewCandidateName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="candidateDescription">Description</label>
                  <textarea
                    name="candidateDescription"
                    id="candidateDescription"
                    placeholder="Enter candidate description"
                    className="w-full bg-slate-50 p-2 rounded-lg"
                    rows={3}
                    value={newCandidateDescription}
                    onChange={(e) => setNewCandidateDescription(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="candidateParty">Party</label>
                  <input
                    type="text"
                    id="candidateParty"
                    placeholder="Enter party name"
                    className="bg-slate-50 w-full p-2 rounded"
                    value={newCandidateParty}
                    onChange={(e) => setNewCandidateParty(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    className="btn pry-btn"
                    onClick={() => setIsAddCandidateOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn sec-btn">
                    Add Candidate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* category  cards */}
        <div>
          {loading ? (
            <p>Loading Categories...</p>
          ) : error ? (
            <p>{error}</p>
          ) : categories.length === 0 ? (
            <p>No Categories yet</p>
          ) : (
            categories.map((category) => (
              <div className="mb-16 border border-slate-300 p-4 rounded-xl">
                <div className="flex gap-2 justify-between px-2">
                  <div>
                    <h5 className="font-bold">
                      {category.title || "Untitled Category"}
                    </h5>
                    <p>{category.description || "No description"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="border border-slate-300 px-2 rounded-md">
                      {category.candidates.length} candidates
                    </p>
                    <div
                      onClick={() => handleDeleteCategory(category.id)}
                      className="border border-slate-300 rounded-md"
                    >
                      <RiDeleteBin6Line className="m-1.5  text-xl text-red-500" />
                    </div>
                  </div>
                </div>
                {/* candidates */}
                <div className="mt-8 px-2 space-y-2">
                  {category.candidates.length === 0 ? (
                    <p>No candidates yet</p>
                  ) : (
                    category.candidates.map((candidate, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center gap-2 bg-slate-300/30 p-4 rounded-lg"
                      >
                        <div>
                          <h5 className="font-bold">
                            {candidate.name || "Unnamed Candidate"}
                          </h5>
                          <p className="text-sm py-0.5">
                            {candidate.description || "No description"}
                          </p>
                          <p className="text-xs border border-slate-300 font-bold p-1 w-fit rounded-sm">
                            {candidate.party || "No party"}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            handleDeleteCandidate(category.id, candidate.id)
                          }
                          className="border border-slate-300 rounded-md p-1.5"
                        >
                          <RiDeleteBin6Line className="text-xl text-red-500" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setIsAddCandidateOpen(true);
                  }}
                  className="border border-slate-300 py-1 w-full mt-4 rounded-md hover:bg-slate-400/10 cursor-pointer"
                >
                  + Add Candidate
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
