import { Alert, AlertTitle, Box, List } from '@mui/material';
import router from 'next/router';
import React from 'react';
import useMe from '../../../../hooks/useMe';
import usePersistState from '../../../../hooks/usePersistState';
import HomeNoteListItem from '../../Home/HomeNoteListItem';
import HomeNoteListItemSkeleton from '../../Home/HomeNoteListItemSkeleton';

const FavoritedNotes = () => {
  const { me, loading } = useMe();
  const userFavorites = me?.userFavorites;

  const [_, setValue] = usePersistState<{ value: number }>(
    'notdown-search-tab-value',
    {
      value: 0,
    }
  );

  const onSearchForArticlesClick = () => {
    setValue({ value: 0 });
    router.push('/search');
  };

  return (
    <List disablePadding>
      {loading ? (
        [0, 1].map((i) => <HomeNoteListItemSkeleton key={i} />)
      ) : (
        <Box>
          {(userFavorites || []).length === 0 ? (
            <Alert severity="info">
              <AlertTitle>You don&apos;t have any notes here.</AlertTitle>
              Click{' '}
              <strong
                onClick={onSearchForArticlesClick}
                style={{ cursor: 'pointer' }}
              >
                here
              </strong>{' '}
              to search for articles and favorite them!
            </Alert>
          ) : (
            (userFavorites || []).map((note, i) => (
              <HomeNoteListItem
                shouldRenderDivider={(userFavorites || []).length - 1 !== i}
                note={note}
                key={note?.id}
              />
            ))
          )}
        </Box>
      )}
    </List>
  );
};

export default FavoritedNotes;
