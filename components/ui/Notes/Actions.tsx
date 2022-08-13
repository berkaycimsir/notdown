import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MoreHorizRounded } from '@mui/icons-material';
import { styled, experimental_sx as sx, Box } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useEditorStateStore } from '../../../store/editor-state';
import {
  GetPublishedNotesDocument,
  GetSavedNotesDocument,
  NotesQueryNoteFragment,
  usePublishNoteMutation,
  useRemoveNoteMutation,
} from '../../../generated/graphql';
import { CircleLoader, ClipLoader } from 'react-spinners';

const StyledButton = styled(Typography)(
  sx({
    m: 2,
    color: grey[700],
    cursor: 'pointer',
    ':hover': {
      color: grey[900],
    },
  })
);

type Props = {
  note: NotesQueryNoteFragment;
};

const NoteActions: React.FC<Props> = ({ note }) => {
  const router = useRouter();
  const { setTitle, setTags, setSummary, setMarkdown, setEditing } =
    useEditorStateStore();

  const [publishNote, { loading: publishNoteLoading }] =
    usePublishNoteMutation();

  const [removeNote, { loading: removeNoteLoading }] = useRemoveNoteMutation();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = React.useMemo(() => (open ? 'simple-popover' : undefined), [open]);

  const onEditClick = () => {
    setTitle(note.title);
    setTags(note.tags);
    setSummary(note.summary);
    setMarkdown(note.markdown);
    setEditing({ noteId: note.id });
    router.push('/new');
  };

  const onPublishClick = () => {
    publishNote({
      variables: { noteId: note.id },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GetSavedNotesDocument,
          variables: { authorId: String(note.author.id) },
        },
        {
          query: GetPublishedNotesDocument,
          variables: { authorId: String(note.author.id) },
        },
      ],
    });
  };

  const onRemoveClick = () => {
    removeNote({
      variables: { noteId: note.id },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GetSavedNotesDocument,
          variables: { authorId: String(note.author.id) },
        },
        {
          query: GetPublishedNotesDocument,
          variables: { authorId: String(note.author.id) },
        },
      ],
    });
  };

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick} size="small">
        <MoreHorizRounded />
      </IconButton>
      <Popover
        PaperProps={{
          variant: 'outlined',
          sx: { minWidth: 240 },
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledButton onClick={onEditClick} variant="subtitle2">
          Edit
        </StyledButton>
        {!note.isPublished && (
          <StyledButton
            onClick={onPublishClick}
            sx={{ color: green[700], ':hover': { color: green[800] } }}
            variant="subtitle2"
          >
            <span style={{ marginRight: 4 }}>Publish</span>
            {publishNoteLoading && <ClipLoader size={8} color={green[300]} />}
          </StyledButton>
        )}
        <StyledButton
          onClick={onRemoveClick}
          sx={{ color: red[700], ':hover': { color: red[800] } }}
          variant="subtitle2"
        >
          <span style={{ marginRight: 4 }}>Remove</span>
          {removeNoteLoading && <ClipLoader size={8} color={red[300]} />}
        </StyledButton>
      </Popover>
    </div>
  );
};

export default NoteActions;
