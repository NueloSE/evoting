import useStore from "../../server/store";

function DeleteElectionToast({ electionName, onClose }) {
    const deleteElection = useStore((state) => state.deleteElection);
    
    const handleDeleteElection = async (electionId) => {
      const result = await deleteElection(electionId);
      if (result?.error) {
        alert(result.error);
      } 
    };
  return (
    <div>
      <h4>Delete Election</h4>
      <p>
        Are you sure you want to delete "{electionName}"? This will also delete
        all categories and candidates associated with this election.
      </p>
      <div onClick={onClose} className="flex gap-2 justify-end mt-4">
        <button className="bg-slate-50 text-slate-700 px-4 py-2 border rounded-sm cursor-pointer">
          Cancel
        </button>
        <button
          onClick={() => handleDeleteElection(electionName)}
          className="bg-slate-800 text-slate-50 px-4 py-2 rounded-sm cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteElectionToast;
