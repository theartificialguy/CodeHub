import { create } from "zustand";

type ModalMode = 'view' | 'edit' | 'create';

interface IModal {
    selectedSnippetId: string | null;
    setSelectedSnippetId: (snippetId: string | null) => void;
    mode: ModalMode;
    setMode: (mode: ModalMode) => void;
    isVisible: boolean;
    setVisible: (value: boolean) => void;
}

const useModalStore = create<IModal>((set) => ({
    mode: 'create',
    isVisible: false,
    selectedSnippetId: null,
    setSelectedSnippetId: (snippetId) => set({ selectedSnippetId: snippetId }),
    setMode: (mode) => set({ mode }),
    setVisible: (value) => set(() => ({ isVisible: value })),
}));

export default useModalStore;