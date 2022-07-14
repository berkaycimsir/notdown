import { List } from '@mui/material';
import React from 'react';
import useMe from '../../../../hooks/useMe';
import HomeNoteListItem from '../../Home/HomeNoteListItem';
import HomeNoteListItemSkeleton from '../../Home/HomeNoteListItemSkeleton';

const FavoritedNotes = () => {
  const { me, loading } = useMe();
  const userFavorites = me?.userFavorites;

  return (
    <List disablePadding>
      {loading
        ? [0, 1].map((i) => <HomeNoteListItemSkeleton key={i} />)
        : (userFavorites || []).map((note, i) => (
            <HomeNoteListItem
              shouldRenderDivider={(userFavorites || []).length - 1 !== i}
              note={note}
              key={note?.id}
            />
          ))}
    </List>
  );
};

export default FavoritedNotes;
