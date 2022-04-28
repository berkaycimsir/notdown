import { Button } from '@mui/material';
import type { NextPage } from 'next';
import React from 'react';
import useMarkdownEditorTheme from '../hooks/useMarkdownEditorTheme';
import Editor from './Editor';

const Home: NextPage = () => {
  const { changeTheme } = useMarkdownEditorTheme();

  return (
    <div style={{ padding: 50 }}>
      <Button onClick={changeTheme}>change theme</Button>
      <Editor />
    </div>
  );
};

export default Home;
