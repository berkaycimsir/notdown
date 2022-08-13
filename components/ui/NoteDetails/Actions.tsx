import { MoreHorizRounded } from '@mui/icons-material';
import { Box, IconButton, experimental_sx as sx, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { NotesQueryNoteFragment } from '../../../generated/graphql';
import useMe from '../../../hooks/useMe';
import BookmarkButton from '../Button/BookmarkButton';
import NoteActions from '../Notes/Actions';

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
  const { me } = useMe();

  const myNote = me?.id === note.author.id;

  return (
    <Box>
      {!myNote && <BookmarkButton note={note} />}
      {myNote && <NoteActions note={note} />}
    </Box>
  );
};

export default NoteDetailsActions;
