import type { NextPage } from 'next';
import React from 'react';
import Editor from '../../components/Editor';
import Title from '../../components/NewNote/Title';
import useEditorState from '../../hooks/useEditorState';
import { Box } from '@mui/material';
import EditorHeader from '../../components/NewNote/Header';

const New: NextPage = () => {
  const { markdownValue, onMarkdownChange } = useEditorState();

  return (
    <Box>
      <EditorHeader />
      <Title />
      <Editor value={markdownValue} onChange={onMarkdownChange} />
    </Box>
  );
};

export default New;
