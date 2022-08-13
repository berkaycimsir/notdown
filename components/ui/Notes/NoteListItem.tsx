import {
  ListItem,
  ListItemText,
  Typography,
  Divider,
  styled,
  experimental_sx as sx,
  ListItemSecondaryAction,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React from 'react';
import { NotesQueryNoteFragment } from '../../../generated/graphql';
import { timeAgo } from '../../../utils/date';
import { readingTime, wordCount } from '../../../utils/markdown';
import NoteActions from './Actions';

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

const StyledTags = styled(Typography)(
  sx({
    mt: 1.5,
    color: grey[700],
    cursor: 'pointer',
    display: 'inline',
    mr: 1,
    ':hover': {
      color: grey[900],
    },
  })
);

const StyledSummaryText = styled(Typography)(
  sx({
    wordBreak: 'break-all',
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
              <StyledSummaryText variant="subtitle2" color="text.secondary">
                {note?.summary.slice(0, 320)}
                {Number(note?.summary.length) > 320 && '...'}
              </StyledSummaryText>
            </React.Fragment>
          }
        />
        {note && (
          <ListItemSecondaryAction>
            <NoteActions note={note} />
          </ListItemSecondaryAction>
        )}
      </ListItem>
      {note?.tags.map((tag) => (
        <StyledTags variant="caption" key={tag}>
          #{tag}
        </StyledTags>
      ))}
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
