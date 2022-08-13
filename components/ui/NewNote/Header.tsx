import { ArrowBackRounded } from '@mui/icons-material';
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
import {
  GetPublishedNotesDocument,
  GetSavedNotesDocument,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from '../../../generated/graphql';
import useMe from '../../../hooks/useMe';
import { useEditorStateStore } from '../../../store/editor-state';
import { getErrorMessage } from './helpers';
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
  const { title, markdown, summary, tags, clear, editing, setEditing } =
    useEditorStateStore();
  const { showToast } = useToastsContext();
  const router = useRouter();

  const [createNote, { loading }] = useCreateNoteMutation();
  const [updateNote, { loading: updateNoteLoading }] = useUpdateNoteMutation();

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

      if (editing.noteId) {
        await updateNote({
          variables: {
            noteId: editing.noteId,
            newNote: {
              title,
              markdown,
              summary,
              tags,
            },
          },
          refetchQueries: [
            {
              query: GetSavedNotesDocument,
              variables: { authorId: String(me.id) },
            },
            {
              query: GetPublishedNotesDocument,
              variables: { authorId: String(me.id) },
            },
          ],
        });

        showToast({
          type: 'success',
          message: getErrorMessage(null, isPublished, true),
        });

        router.push(`/notes/${editing.noteId}`);
        setEditing({ noteId: undefined });
      } else {
        const { data } = await createNote({
          variables: {
            title,
            markdown,
            summary,
            tags,
            userId: String(me.id),
            isPublished,
          },
          refetchQueries: [
            {
              query: GetSavedNotesDocument,
              variables: { authorId: String(me.id) },
            },
            {
              query: GetPublishedNotesDocument,
              variables: { authorId: String(me.id) },
            },
          ],
        });

        const error = data?.createNote?.error;

        showToast({
          type: error ? 'error' : 'success',
          message: getErrorMessage(error, isPublished, false),
        });

        router.push(`/notes/${data?.createNote?.note?.id}`);
      }

      clear();
    },
    [
      me,
      isEmpty,
      editing.noteId,
      showToast,
      updateNote,
      title,
      markdown,
      summary,
      tags,
      createNote,
      clear,
      setEditing,
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
        loading={loading || updateNoteLoading}
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
