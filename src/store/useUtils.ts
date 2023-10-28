import { create } from "zustand";

import { SORT_TYPES } from "@/types";

interface IUtils {
  input: string;
  sortBy: SORT_TYPES;
  handleInput: (text: string) => void;
  handleSortBy: (sortByValue: SORT_TYPES) => void;
}

const useInputStore = create<IUtils>((set) => ({
  input: "",
  sortBy: "CA-DESC",
  handleInput: (text) => set({ input: text }),
  handleSortBy: (value) => set({ sortBy: value }),
}));

export default useInputStore;
