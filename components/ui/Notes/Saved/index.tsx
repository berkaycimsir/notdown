import { List } from '@mui/material';
import React from 'react';
import { useGetSavedNotesQuery } from '../../../../generated/graphql';
import useMe from '../../../../hooks/useMe';
import NoteListItem from '../NoteListItem';
import NoteListItemSkeleton from '../NoteListItemSkeleton';

const SavedNotes = () => {
  const { me } = useMe();

  const { data, loading } = useGetSavedNotesQuery({
    variables: { authorId: String(me?.id) },
  });

  return (
    <List disablePadding>
      {loading
        ? [0, 1].map((i) => <NoteListItemSkeleton key={i} />)
        : (data?.getSavedNotes || []).map((note, i) => (
            <NoteListItem
              shouldRenderDivider={(data?.getSavedNotes || []).length - 1 !== i}
              note={note}
              key={note?.id}
            />
          ))}
    </List>
  );
};

export default SavedNotes;
