import { List } from '@mui/material';
import React from 'react';
import { useGetPublishedNotesQuery } from '../../../../generated/graphql';
import useMe from '../../../../hooks/useMe';
import NoteListItem from '../NoteListItem';
import NoteListItemSkeleton from '../NoteListItemSkeleton';

const PublishedNotes = () => {
  const { me } = useMe();

  const { data, loading } = useGetPublishedNotesQuery({
    variables: { authorId: String(me?.id) },
  });

  return (
    <List disablePadding>
      {loading
        ? [0, 1].map((i) => <NoteListItemSkeleton key={i} />)
        : (data?.getPublishedNotes || []).map((note, i) => (
            <NoteListItem
              shouldRenderDivider={
                (data?.getPublishedNotes || []).length - 1 !== i
              }
              note={note}
              key={note?.id}
            />
          ))}
    </List>
  );
};

export default PublishedNotes;
