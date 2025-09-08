import { create } from "zustand";
import {
  continueAsOrganizer,
  createNewElection,
  monitorAuthState,
  deleteElection,
} from "./backend";

const useStore = create((set, get) => ({
  user: null,
  loading: true,
  organizer: null,
  electionsObj: {},

  createNewElection: async (electionData) => {
    const { user } = get();
    if (!user || !user.uid) {
      set({ error: "No authenticated user" });
      return;
    }
    set({ loading: true });
    const result = await createNewElection(user.uid, electionData);

    if (result.error) {
      set({ error: result.error, loading: false });
      return;
    }

    set((state) => ({
      electionsObj: {
        ...state.electionsObj,
        [result.electionId]: result.electionData,
      },
      loading: false,
    }));
  },
  getElections: async () => {
    const { user } = get();
    if (!user || !user.uid) {
      set({ error: "No authenticated user", loading: false });
    }

    set({ loading: true });
    const result = await continueAsOrganizer(user);

    if (result.error) {
      set({ error: result.error, loading: false });
      return;
    }

    if (result.exists) {
      set({
        organizer: { id: user.uid, ...result.organizerData },
        electionsObj: result.elections,
        loading: false,
      });
    } else {
      set({
        organizer: null,
        electionObj: {},
        loading: false,
      });
    }

    // reload elections
  },
  deleteElection: async (electionId) => {
    const { user } = get();
    if (!user || !user.uid) {
      set({ error: "No authenticated user" });
      return;
    }

    set({ loading: true });
    const result = await deleteElection(user.uid, electionId);

    if (result.error) {
      set({ error: result.error, loading: false });
      return result;
    }

    set((state) => {
      const newElectionsObj = { ...state.electionsObj };
      delete newElectionsObj[electionId];
      return {
        electionsObj: newElectionsObj,
        loading: false,
      };
    });

    // store.loadElections

    return result;
  },
  initializeAuth: () => {
    const unsubscribe = monitorAuthState((user) => {
      set({
        user: user || null,
        loading: false,
        error: null,
      });
    });
    return unsubscribe;
  },
  setError: (error) => set({ error }),
}));

export default useStore;
