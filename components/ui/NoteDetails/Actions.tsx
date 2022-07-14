import { MoreHorizRounded } from '@mui/icons-material';
import { Box, IconButton, experimental_sx as sx, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { NotesQueryNoteFragment } from '../../../generated/graphql';
import BookmarkButton from '../Button/BookmarkButton';

const StyledMoreIcon = styled(MoreHorizRounded)(
  sx({
    color: grey[700],
    ':hover': {
      color: grey[900],
    },
  })
);

type Props = {
  note: NotesQueryNoteFragment;
};

const NoteDetailsActions: React.FC<Props> = ({ note }) => {
  return (
    <Box>
      <BookmarkButton note={note} />
      <IconButton sx={{ ml: 2 }} size="small">
        <StyledMoreIcon />
      </IconButton>
    </Box>
  );
};

export default NoteDetailsActions;
