import React from 'react';
import { List } from '@mui/material';
import { useGetAllPublishedNotesQuery } from '../../../generated/graphql';
import HomeNoteListItem from '../HomeNoteListItem';
import HomeNoteListItemSkeleton from '../HomeNoteListItemSkeleton';

const RecommendedNotes = () => {
  const { data, loading } = useGetAllPublishedNotesQuery();

  return (
    <List disablePadding>
      {loading
        ? [0, 1].map((i) => <HomeNoteListItemSkeleton key={i} />)
        : (data?.getAllPublishedNotes || []).map((note, i) => (
            <HomeNoteListItem
              shouldRenderDivider={
                (data?.getAllPublishedNotes || []).length - 1 !== i
              }
              note={note}
              key={note?.id}
            />
          ))}
    </List>
  );
};

export default RecommendedNotes;
