import { Box, Button } from '@mui/material';
import type { NextPage } from 'next';
import React from 'react';
import useMarkdownEditorTheme from '../hooks/useMarkdownEditorTheme';
import Editor from '../components/Editor';
import AppLayout from '../layouts/AppLayout';

const Home: NextPage = () => {
  const { changeTheme } = useMarkdownEditorTheme();

  return (
    <AppLayout>
      <Button variant="outlined" onClick={changeTheme}>
        change theme
      </Button>
      <Editor />
    </AppLayout>
  );
};

export default Home;
