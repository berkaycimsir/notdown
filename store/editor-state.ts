import { createPersistentStore } from '../utils/create-persistent-store';

type EditorState = {
  title: string;
  markdown: string;
  summary: string;
  tags: Array<string>;
  editing: { noteId: number | undefined };
  setMarkdown: (newValue: string) => void;
  setTitle: (newValue: string) => void;
  setSummary: (newValue: string) => void;
  setTags: (newTags: Array<string>) => void;
  setEditing: (newValue: { noteId: number | undefined }) => void;
  clear: () => void;
};

const initialState = {
  title: '',
  markdown: '> Tell about your story...',
  summary: '',
  editing: { noteId: undefined },
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
  setEditing: (newValue: { noteId: number | undefined }) => {
    set((prev) => ({ ...prev, editing: newValue }));
  },
  clear: () =>
    set((prev) => ({
      ...prev,
      ...initialState,
    })),
}));
