import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import BookmarksTabs from '../../components/ui/Bookmarks/BookmarksTabs';

const Bookmarks = () => {
  return (
    <Container maxWidth="md">
      <Typography sx={{ mb: 4 }} fontWeight="bold" variant="h4">
        Your Bookmarks
      </Typography>
      <BookmarksTabs />
    </Container>
  );
};

export default Bookmarks;
