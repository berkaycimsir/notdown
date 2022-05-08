import { createPersistentStore } from '../utils/create-persistent-store';

type EditorState = {
  title: string;
  markdown: string;
  setMarkdown: (newValue: string) => void;
  setTitle: (newValue: string) => void;
  clear: () => void;
};

export const useEditorStateStore = createPersistentStore({
  name: 'notdown-editor-state',
})<EditorState>((set) => ({
  title: '',
  markdown: '',
  setMarkdown: (newValue: string) => {
    set((prev) => ({ ...prev, markdown: newValue }));
  },
  setTitle: (newValue: string) => {
    set((prev) => ({ ...prev, title: newValue }));
  },
  clear: () => set((prev) => ({ ...prev, title: '', markdown: '' })),
}));
