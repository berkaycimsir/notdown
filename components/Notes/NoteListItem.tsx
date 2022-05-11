import {
  ListItem,
  ListItemText,
  Typography,
  Divider,
  styled,
  experimental_sx as sx,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { NotesQueryNoteFragment } from '../../generated/graphql';
import { timeAgo } from '../../utils/date';
import { readingTime, wordCount } from '../../utils/markdown';

type Props = {
  shouldRenderDivider: boolean;
  note: NotesQueryNoteFragment | null;
};

const StyledInfoText = styled(Typography)(
  sx({
    fontWeight: 300,
    fontSize: 13,
    mb: 2,
    color: 'GrayText',
  })
);

const StyledDivider = styled(Divider)(
  sx({
    mb: 2,
    mt: 1,
    borderWidth: 0.1,
  })
);

const NoteListItem: React.FC<Props> = ({ shouldRenderDivider, note }) => {
  const router = useRouter();

  const onNoteClick = React.useCallback(() => {
    router.push(`/notes/${note?.id}`);
  }, [note?.id, router]);

  return (
    <>
      <ListItem onClick={onNoteClick} sx={{ cursor: 'pointer' }} disableGutters>
        <ListItemText
          primaryTypographyProps={{
            variant: 'subtitle1',
            fontWeight: 800,
          }}
          primary={note?.title}
          secondary={
            <React.Fragment>
              <Typography variant="subtitle2" color="text.secondary">
                {note?.summary.slice(0, 140)}...
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <StyledInfoText variant="subtitle2">
        Last edited {timeAgo(note?.updatedAt)} ·{' '}
        {readingTime(String(note?.markdown))} min read (
        {wordCount(String(note?.markdown))} words) so far
      </StyledInfoText>
      {shouldRenderDivider && <StyledDivider />}
    </>
  );
};

export default NoteListItem;
