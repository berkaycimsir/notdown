import { ListItem, ListItemText, Typography, Divider } from '@mui/material';
import React from 'react';
import { NotesQueryNoteFragment } from '../../generated/graphql';
import { timeAgo } from '../../utils/date';
import { readingTime, wordCount } from '../../utils/markdown';

type Props = {
  shouldRenderDivider: boolean;
  note: NotesQueryNoteFragment | null;
};

const NoteListItem: React.FC<Props> = ({ shouldRenderDivider, note }) => {
  return (
    <>
      <ListItem disableGutters>
        <ListItemText
          primaryTypographyProps={{
            variant: 'subtitle1',
            fontWeight: 800,
          }}
          primary={note?.title}
          secondary={
            <React.Fragment>
              <Typography variant="subtitle2" color="text.secondary">
                {note?.markdown.slice(0, 140)}
              </Typography>
              <Typography
                sx={{ mt: 2, fontWeight: 300, fontSize: 13 }}
                variant="subtitle2"
                color="text.secondary"
              >
                Last edited {timeAgo(note?.updatedAt)} ·{' '}
                {readingTime(String(note?.markdown))} min read (
                {wordCount(String(note?.markdown))} words) so far
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {shouldRenderDivider && (
        <Divider sx={{ mb: 2, mt: 1, borderWidth: 0.1 }} />
      )}
    </>
  );
};

export default NoteListItem;
