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
import { useToastsContext } from '../../../contexts/toasts';
import { useCreateNoteMutation } from '../../../generated/graphql';
import useMe from '../../../hooks/useMe';
import { useEditorStateStore } from '../../../store/editor-state';
import {
  getErrorMessage,
  updatePublishedNotes,
  updateSavedNotes,
} from './helpers';
import MoreOptions from './MoreOptions';

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
  const { title, markdown, summary, tags, clear } = useEditorStateStore();
  const { showToast } = useToastsContext();
  const router = useRouter();

  const [createNote, { loading }] = useCreateNoteMutation();

  const isEmpty = React.useMemo(
    () => title === '' || markdown === '' || summary === '',
    [title, markdown, summary]
  );

  const onSaveButtonClick = React.useCallback(
    async (_: any, isPublished: boolean = false) => {
      if (!me) return;

      if (isEmpty) {
        showToast({
          type: 'error',
          message: 'Oops, there are still blank fields',
        });
        return;
      }

      const { data } = await createNote({
        variables: {
          title,
          markdown,
          summary,
          tags,
          userId: String(me.id),
          isPublished,
        },
        update: (_, { data: mutationData }) => {
          const createdNote = mutationData?.createNote.note;
          if (!createdNote) return;
          if (isPublished) updatePublishedNotes(String(me.id), createdNote);
          if (!isPublished) updateSavedNotes(String(me.id), createdNote);
        },
      });

      const error = data?.createNote?.error;

      showToast({
        type: error ? 'error' : 'success',
        message: getErrorMessage(error, isPublished),
      });

      if (!error) {
        clear();
        router.push(`/notes/${data?.createNote?.note?.id}`);
      }
    },
    [
      me,
      isEmpty,
      createNote,
      title,
      markdown,
      summary,
      tags,
      showToast,
      clear,
      router,
    ]
  );

  return (
    <StyledContainer>
      <IconButton size="small">
        <ArrowBackRounded onClick={() => router.back()} />
      </IconButton>
      <StyledDraftText variant="subtitle1">
        Draft in {me?.username}
      </StyledDraftText>

      <div style={{ flex: 1 }} />

      <StyledButton
        onClick={(e) => onSaveButtonClick(e, false)}
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

      <MoreOptions onSaveButtonClick={onSaveButtonClick} />
    </StyledContainer>
  );
};

export default EditorHeader;
