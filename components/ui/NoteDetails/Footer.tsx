import { ForumRounded, StarBorderRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  styled,
  experimental_sx as sx,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { green, grey, indigo, yellow } from '@mui/material/colors';
import React from 'react';
import { NotesQueryNoteFragment } from '../../../generated/graphql';
import FollowButton from '../Button/FollowButton';
import Link from '../Link';
import NoteDetailsActions from './Actions';

const StyledStarIcon = styled(StarBorderRounded)(
  sx({
    color: yellow[600],
  })
);

const StyledCommentIcon = styled(ForumRounded)(
  sx({
    fontSize: 18,
    color: indigo[300],
  })
);

const StyledButton = styled(LoadingButton)(
  sx({
    textTransform: 'none',
    borderRadius: 12,
    background: green[600],
    ':hover': {
      background: green[600],
      opacity: 0.9,
    },
  })
);

type Props = {
  note: NotesQueryNoteFragment;
};

const NoteDetailsFooter: React.FC<Props> = ({ note }) => {
  return (
    <Box my={12}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton sx={{ mr: 1 }} size="small">
              <StyledStarIcon />
            </IconButton>
            <Typography fontWeight="normal" color={grey[700]} variant="caption">
              12
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton sx={{ ml: 2, mr: 1 }} size="small">
              <StyledCommentIcon />
            </IconButton>
            <Typography fontWeight="normal" color={grey[700]} variant="caption">
              23
            </Typography>
          </Box>
        </Box>

        <NoteDetailsActions />
      </Box>

      <Divider
        sx={{
          borderColor: '#F5F5F5',
          my: 5,
          mx: 'auto',
        }}
      />

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link
          underline="hover"
          color={grey[800]}
          href="/profile"
          variant="subtitle1"
        >
          More from {note.author.username}
        </Link>
        <FollowButton author={note.author} />
      </Box>
    </Box>
  );
};

export default NoteDetailsFooter;
