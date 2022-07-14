import { List } from '@mui/material';
import React from 'react';
import useMe from '../../../../hooks/useMe';
import HomeNoteListItem from '../../Home/HomeNoteListItem';
import HomeNoteListItemSkeleton from '../../Home/HomeNoteListItemSkeleton';

const BookmarkedNotes = () => {
  const { me, loading } = useMe();
  const userBookmarks = me?.userBookmarks;

  return (
    <List disablePadding>
      {loading
        ? [0, 1].map((i) => <HomeNoteListItemSkeleton key={i} />)
        : (userBookmarks || []).map((note, i) => (
            <HomeNoteListItem
              shouldRenderDivider={(userBookmarks || []).length - 1 !== i}
              note={note}
              key={note?.id}
            />
          ))}
    </List>
  );
};

export default BookmarkedNotes;
