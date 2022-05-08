import { ListItem, Skeleton, Typography } from '@mui/material';
import React from 'react';

const NoteListItemSkeleton = () => {
  return (
    <>
      <ListItem disableGutters>
        <Skeleton width="100%" height={25} />
      </ListItem>
      <ListItem sx={{ mb: 4 }} disableGutters>
        <Skeleton width="65%" height={15} />
      </ListItem>
      <ListItem sx={{ mb: 6 }} disableGutters>
        <Skeleton width="35%" height={10} />
        <Skeleton
          sx={{ mx: 2 }}
          animation="wave"
          variant="circular"
          width={5}
          height={5}
        />
        <Skeleton width="25%" height={10} />
      </ListItem>
    </>
  );
};

export default NoteListItemSkeleton;
