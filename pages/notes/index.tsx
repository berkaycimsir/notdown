import {
  Container,
  Typography,
  styled,
  experimental_sx as sx,
  Button,
  Box,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React from 'react';
import NotesTab from '../../components/ui/Notes/NotesTab';

const StyledTopContainer = styled(Box)(
  sx({
    display: 'flex',
    alingItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  })
);

const StyledButton = styled(Button)(
  sx({
    textTransform: 'none',
    borderRadius: 12,
    background: green[700],
    px: 2,
    fontWeight: 800,
    height: 38,
    ':hover': {
      background: green[800],
    },
  })
);

const Notes = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <StyledTopContainer>
        <Typography fontWeight="bold" variant="h4">
          Your Notes
        </Typography>
        <StyledButton
          onClick={() => router.push('/new')}
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
          variant="contained"
          size="small"
        >
          Write a Note
        </StyledButton>
      </StyledTopContainer>
      <NotesTab />
    </Container>
  );
};

export default Notes;
