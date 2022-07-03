import { Box, Skeleton } from '@mui/material';
import React from 'react';
import HomeNoteListItemSkeleton from '../Home/HomeNoteListItemSkeleton';

const ProfilePageLoading = () => {
  return (
    <Box mt={2}>
      {[0, 1, 2, 3, 4].map((i) => (
        <HomeNoteListItemSkeleton key={i} />
      ))}
    </Box>
  );
};

export default ProfilePageLoading;
