import { BookmarkAddOutlined, MoreHorizRounded } from '@mui/icons-material';
import { Box, IconButton, experimental_sx as sx, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

const StyledBookmarkIcon = styled(BookmarkAddOutlined)(
  sx({
    color: grey[700],
    ':hover': {
      color: grey[900],
    },
  })
);

const StyledMoreIcon = styled(MoreHorizRounded)(
  sx({
    color: grey[700],
    ':hover': {
      color: grey[900],
    },
  })
);

const NoteDetailsActions = () => {
  return (
    <Box>
      <IconButton size="small">
        <StyledBookmarkIcon />
      </IconButton>
      <IconButton sx={{ ml: 2 }} size="small">
        <StyledMoreIcon />
      </IconButton>
    </Box>
  );
};

export default NoteDetailsActions;
