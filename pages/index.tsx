import React from 'react';
import type { NextPage } from 'next';
import HomeNotesTab from '../components/ui/Home/HomeNotesTab';
import { Container } from '@mui/material';
import useMarkdownEditorTheme from '../hooks/useMarkdownEditorTheme';

const Home: NextPage = () => {
  return (
    <Container maxWidth="md">
      <HomeNotesTab />
    </Container>
  );
};

export default Home;
