import { create } from "zustand";

type HomeViewStore = {
    editorContent: string | null;
    editionDisabled: boolean;
    setEditorContent: (content: string) => void;
    toggleEdition: () => void;
    dirty: boolean;
    setDirty: (value: boolean) => void;
}

const useHomeViewStore = create<HomeViewStore>()(set => ({
    editorContent: null,
    editionDisabled: true,
    setEditorContent: (content) => set({ editorContent: content }),
    toggleEdition: () => set(state => ({ editionDisabled: !state.editionDisabled })),
    dirty: false,
    setDirty: (value) => set({ dirty: value })
}));

export default useHomeViewStore;