import { ArrowBackRounded, MoreHorizRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  styled,
  Typography,
  experimental_sx as sx,
  IconButton,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React from 'react';
import useMe from '../../hooks/useMe';

const StyledContainer = styled(Box)(
  sx({
    mb: 4,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  })
);

const StyledDraftText = styled(Typography)({
  color: 'rgba(41, 41, 41, 1)',
  fontWeight: 400,
  marginLeft: 12,
});

const StyledButton = styled(LoadingButton)(
  sx({
    textTransform: 'none',
    borderRadius: 12,
    background: green[600],
    mr: 2,
    ':hover': {
      background: green[600],
      opacity: 0.9,
    },
  })
);

const EditorHeader = () => {
  const { me } = useMe();
  const router = useRouter();

  return (
    <StyledContainer>
      <IconButton size="small">
        <ArrowBackRounded onClick={() => router.push('/')} />
      </IconButton>
      <StyledDraftText variant="subtitle1">
        Draft in {me?.username}
      </StyledDraftText>
      <div style={{ flex: 1 }} />
      <StyledButton
        disableElevation
        disableFocusRipple
        disableRipple
        disableTouchRipple
        size="small"
        variant="contained"
      >
        Publish
      </StyledButton>
      <IconButton size="small">
        <MoreHorizRounded />
      </IconButton>
    </StyledContainer>
  );
};

export default EditorHeader;
