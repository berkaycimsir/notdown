import { createPersistentStore } from '../utils/create-persistent-store';

type EditorState = {
  title: string;
  markdown: string;
  summary: string;
  tags: Array<string>;
  setMarkdown: (newValue: string) => void;
  setTitle: (newValue: string) => void;
  setSummary: (newValue: string) => void;
  setTags: (newTags: Array<string>) => void;
  clear: () => void;
};

const initialState = {
  title: '',
  markdown: '> Tell about your story...',
  summary: '',
  tags: [],
};

export const useEditorStateStore = createPersistentStore({
  name: 'notdown-editor-state',
})<EditorState>((set) => ({
  ...initialState,
  setMarkdown: (newValue: string) => {
    set((prev) => ({ ...prev, markdown: newValue }));
  },
  setTitle: (newValue: string) => {
    set((prev) => ({ ...prev, title: newValue }));
  },
  setSummary: (newValue: string) => {
    set((prev) => ({ ...prev, summary: newValue }));
  },
  setTags: (newTags: Array<string>) => {
    set((prev) => ({ ...prev, tags: newTags }));
  },
  clear: () =>
    set((prev) => ({
      ...prev,
      ...initialState,
    })),
}));
