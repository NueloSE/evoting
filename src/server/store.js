import { create } from "zustand";
import { monitorAuthState } from "./backend";

const useStore = create((set) => ({
  user: null,
  loading: true,
  initializeAuth: () => {
    const unsubscribe = monitorAuthState((user) => {
        set({
            user: user || null,
            loading: false,
            error: null,
        })

    });
    return unsubscribe;
    
  },
  setError: (error) => set({error})
}));

export default useStore;
