import React from 'react';
import { List } from '@mui/material';
import {
  useGetAllPublishedNotesQuery,
  useGetNotesByFollowingQuery,
} from '../../../../generated/graphql';
import HomeNoteListItem from '../HomeNoteListItem';
import HomeNoteListItemSkeleton from '../HomeNoteListItemSkeleton';
import useMe from '../../../../hooks/useMe';

const FollowingNotes = () => {
  const { me } = useMe();
  const { data, loading } = useGetNotesByFollowingQuery({
    variables: { userFollowing: (me || {}).following || [] },
  });

  return (
    <List disablePadding>
      {loading
        ? [0, 1].map((i) => <HomeNoteListItemSkeleton key={i} />)
        : (data?.getNotesByFollowing || []).map((note, i) => (
            <HomeNoteListItem
              shouldRenderDivider={
                (data?.getNotesByFollowing || []).length - 1 !== i
              }
              note={note}
              key={note?.id}
            />
          ))}
    </List>
  );
};

export default FollowingNotes;
