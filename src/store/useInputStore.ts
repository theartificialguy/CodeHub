import { create } from "zustand";

interface IInput {
  input: string;
  handleInput: (text: string) => void;
}

const useInputStore = create<IInput>((set) => ({
  input: "",
  handleInput: (text) => set({ input: text }),
}));

export default useInputStore;
