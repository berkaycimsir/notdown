import React from 'react';
import { List, Box, Alert, AlertTitle } from '@mui/material';
import { useGetNotesByFollowingQuery } from '../../../../generated/graphql';
import HomeNoteListItem from '../HomeNoteListItem';
import HomeNoteListItemSkeleton from '../HomeNoteListItemSkeleton';
import useMe from '../../../../hooks/useMe';
import { useRouter } from 'next/router';
import usePersistState from '../../../../hooks/usePersistState';

const FollowingNotes = () => {
  const { me } = useMe();
  const router = useRouter();
  const { data, loading } = useGetNotesByFollowingQuery({
    variables: { userFollowing: (me || {}).following || [] },
  });

  const [_, setValue] = usePersistState<{ value: number }>(
    'notdown-search-tab-value',
    {
      value: 0,
    }
  );

  const onSearchForAuthorsClick = () => {
    setValue({ value: 1 });
    router.push('/search');
  };

  return (
    <List disablePadding>
      {loading ? (
        [0, 1].map((i) => <HomeNoteListItemSkeleton key={i} />)
      ) : (
        <Box>
          {(data?.getNotesByFollowing || []).length === 0 ? (
            <Alert severity="info">
              <AlertTitle>You are not following anyone.</AlertTitle>
              Click{' '}
              <strong
                onClick={onSearchForAuthorsClick}
                style={{ cursor: 'pointer' }}
              >
                here
              </strong>{' '}
              to search for authors and follow them!
            </Alert>
          ) : (
            (data?.getNotesByFollowing || []).map((note, i) => (
              <HomeNoteListItem
                shouldRenderDivider={
                  (data?.getNotesByFollowing || []).length - 1 !== i
                }
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

export default FollowingNotes;
