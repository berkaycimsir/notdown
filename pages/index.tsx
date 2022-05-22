import React from 'react';
import type { NextPage } from 'next';
import HomeNotesTab from '../components/Home/HomeNotesTab';
import { Container } from '@mui/material';

const Home: NextPage = () => {
  return (
    <Container maxWidth="md">
      <HomeNotesTab />
    </Container>
  );
};

export default Home;
