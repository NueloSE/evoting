import { create } from "zustand";
import {
  continueAsOrganizer,
  createNewElection,
  monitorAuthState,
  deleteElection,
  loadCategories,
  createCategory,
  deleteCategory,
  createCandidate,
  deleteCandidate,
} from "./backend";

const useStore = create((set, get) => ({
  user: null,
  loading: true,
  organizer: null,
  electionsObj: {},
  categoriesObj: {},

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
    alert(`${electionData.title} created successfully`);
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
  loadCategories: async (electionId) => {
    const { user } = get();
    if (!user || !electionId) {
      set({ error: "No user or election selected", loading: false });
      return;
    }
    set({ loading: true, error: null });
    try {
      const result = await loadCategories(user, electionId);
      if (result.error) {
        set({ error: result.error, loading: false });
      } else {
        set((state) => ({
          categoriesObj: {
            ...state.categoriesObj,
            [electionId]: result.categories,
          },
          loading: false,
        }));
      }
    } catch (error) {
      set({ error: "Failed to load categories", loading: false });
      console.error("Loading categories error: ", error);
    }
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

  createCategory: async (electionId, categoryData) => {
    const { user } = get();
    if (!user || !user.uid || !electionId) {
      set({ error: "No user or election selected", loading: false });
      return { error: "No user or election selected" };
    }
    set({ loading: true, error: null });
    try {
      const result = await createCategory(user, electionId, categoryData);
      if (result.error) {
        set({ error: result.error, loading: false });
      } else {
        // Update store with new category
        set((state) => {
          const currentCategories = state.categoriesObj[electionId] || [];
          return {
            categoriesObj: {
              ...state.categoriesObj,
              [electionId]: [
                ...currentCategories,
                {
                  id: result.categoryId,
                  title: categoryData.title,
                  description: categoryData.description,
                  candidates: [],
                  createdAt: new Date().toISOString(), // Approx timestamp
                },
              ],
            },
            loading: false,
          };
        });
      }
      return result;
    } catch (error) {
      set({ error: "Failed to create category", loading: false });
      console.log("Create category error:", error);
      return { error: "Failed to create category" };
    }
  },
  deleteCategory: async (electionId, categoryId) => {
    const { user } = get();
    if (!user || !user.uid || !electionId || !categoryId) {
      set({ error: "No user, election, or category selected", loading: false });
      return { error: "No user, election, or category selected" };
    }
    set({ loading: true, error: null });
    try {
      const result = await deleteCategory(user, electionId, categoryId);
      if (result.error) {
        set({ error: result.error, loading: false });
      } else {
        // Update store by removing the category
        set((state) => {
          const currentCategories = state.categoriesObj[electionId] || [];
          const updatedCategories = currentCategories.filter(
            (cat) => cat.id !== categoryId
          );
          return {
            categoriesObj: {
              ...state.categoriesObj,
              [electionId]: updatedCategories,
            },
            loading: false,
          };
        });
      }
      return result;
    } catch (error) {
      set({ error: "Failed to delete category", loading: false });
      console.log("Delete category error:", error);
      return { error: "Failed to delete category" };
    }
  },
  createCandidate: async (electionId, categoryId, candidateData) => {
    const { user } = get();
    if (!user || !user.uid || !electionId || !categoryId) {
      set({ error: "No user, election, or category selected", loading: false });
      return { error: "No user, election, or category selected" };
    }
    set({ loading: true, error: null });
    try {
      const result = await createCandidate(
        user,
        electionId,
        categoryId,
        candidateData
      );
      if (result.error) {
        set({ error: result.error, loading: false });
      } else {
        // Append new candidate without overwriting existing ones
        set((state) => {
          const currentCategories = state.categoriesObj[electionId] || [];
          const updatedCategories = currentCategories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  candidates: [
                    ...(cat.candidates || []), // Preserve existing candidates
                    {
                      id: result.candidateId,
                      name: candidateData.name,
                      description: candidateData.description,
                      party: candidateData.party,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                }
              : cat
          );
          return {
            categoriesObj: {
              ...state.categoriesObj,
              [electionId]: updatedCategories,
            },
            loading: false,
          };
        });
      }
      return result;
    } catch (error) {
      set({ error: "Failed to create candidate", loading: false });
      console.log("Create candidate error:", error);
      return { error: "Failed to create candidate" };
    }
  },
  deleteCandidate: async (electionId, categoryId, candidateId) => {
    const { user } = get();
    if (!user || !user.uid || !electionId || !categoryId || !candidateId) {
      set({
        error: "No user, election, category, or candidate selected",
        loading: false,
      });
      return { error: "No user, election, category, or candidate selected" };
    }
    set({ loading: true, error: null });
    try {
      const result = await deleteCandidate(
        user,
        electionId,
        categoryId,
        candidateId
      );
      if (result.error) {
        set({ error: result.error, loading: false });
      } else {
        set((state) => {
          const currentCategories = state.categoriesObj[electionId] || [];
          const updatedCategories = currentCategories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  candidates: cat.candidates.filter(
                    (cand) => cand.id !== candidateId
                  ),
                }
              : cat
          );
          return {
            categoriesObj: {
              ...state.categoriesObj,
              [electionId]: updatedCategories,
            },
            loading: false,
          };
        });
      }
      return result;
    } catch (error) {
      set({ error: "Failed to delete candidate", loading: false });
      console.log("Delete candidate error:", error);
      return { error: "Failed to delete candidate" };
    }
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
