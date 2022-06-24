import type { NextPage } from 'next';
import React from 'react';
import Editor from '../../components/ui/Editor';
import Title from '../../components/ui/NewNote/Title';
import { Box } from '@mui/material';
import EditorHeader from '../../components/ui/NewNote/Header';
import { useEditorStateStore } from '../../store/editor-state';
import Summary from '../../components/ui/NewNote/Summary';

const New: NextPage = () => {
  const { markdown, setMarkdown } = useEditorStateStore();

  const onMarkdownChange = React.useCallback(
    (_: any, __: any, value: any) => {
      setMarkdown(value);
    },
    [setMarkdown]
  );

  return (
    <Box>
      <EditorHeader />
      <Title />
      <Summary />
      <Editor value={markdown} onChange={onMarkdownChange} />
    </Box>
  );
};

export default New;
