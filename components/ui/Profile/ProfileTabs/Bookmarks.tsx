import { List } from '@mui/material';
import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../../generated/graphql';
import HomeNoteListItem from '../../Home/HomeNoteListItem';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfileTabBookmarks: React.FC<Props> = ({ user }) => {
  const userBookmarks = user.userBookmarks;

  return (
    <List disablePadding>
      {(userBookmarks || []).map((note, i) => (
        <HomeNoteListItem
          shouldRenderDivider={(userBookmarks || []).length - 1 !== i}
          note={note}
          key={note?.id}
        />
      ))}
    </List>
  );
};

export default ProfileTabBookmarks;
