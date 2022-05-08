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
import { useToastsContext } from '../../contexts/toasts';
import { NoteErrors, useCreateNoteMutation } from '../../generated/graphql';
import useEditorState from '../../hooks/useEditorState';
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
  const { editorState } = useEditorState();
  const { showToast } = useToastsContext();
  const router = useRouter();

  const [createNote, { loading }] = useCreateNoteMutation();

  const onSaveButtonClick = React.useCallback(async () => {
    if (!me) return;

    const { data } = await createNote({
      variables: {
        ...editorState,
        userId: String(me.id),
      },
    });

    const error = data?.createNote?.error;
    const errorMessage =
      error === NoteErrors.UserDoesNotExists &&
      "Couldn't find the author. Please try again!";

    if (!error) {
      showToast({
        type: error ? 'error' : 'success',
        message: errorMessage || 'Your note is successfully saved.',
      });
    }
  }, [createNote, editorState, me, showToast]);

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
        onClick={onSaveButtonClick}
        disableElevation
        disableFocusRipple
        disableRipple
        disableTouchRipple
        loading={loading}
        size="small"
        variant="contained"
      >
        Save
      </StyledButton>
      <IconButton size="small">
        <MoreHorizRounded />
      </IconButton>
    </StyledContainer>
  );
};

export default EditorHeader;
