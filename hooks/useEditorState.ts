import React from 'react';
import usePersistState from './usePersistState';

const NOTDOWN_EDITOR_STATE_KEY = 'notdown-editor-state';

type NotdownEditorState = {
  title: string;
  markdown: string;
};

type ReturnType = {
  markdownValue: string;
  title: string;
  onTitleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onMarkdownChange: (editor: any, state: any, value: any) => void;
  editorState: NotdownEditorState;
};

const useEditorState = (): ReturnType => {
  const [editorState, setEditorState] = usePersistState<NotdownEditorState>(
    NOTDOWN_EDITOR_STATE_KEY,
    {
      title: '',
      markdown: '',
    }
  );

  const onMarkdownChange = React.useCallback(
    (_: any, __: any, value: any) => {
      setEditorState({
        ...editorState,
        markdown: value,
      });
    },
    [editorState, setEditorState]
  );

  const markdownValue = React.useMemo(
    () => editorState.markdown,
    [editorState.markdown]
  );

  const onTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setEditorState({
        ...editorState,
        title: e.target.value,
      });
    },
    [editorState, setEditorState]
  );

  const title = React.useMemo(() => editorState.title, [editorState.title]);

  return { markdownValue, title, onTitleChange, onMarkdownChange, editorState };
};

export default useEditorState;
