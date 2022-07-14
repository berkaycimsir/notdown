import { List } from '@mui/material';
import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../../generated/graphql';
import HomeNoteListItem from '../../Home/HomeNoteListItem';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfileTabFavorites: React.FC<Props> = ({ user }) => {
  const userFavorites = user.userFavorites;

  return (
    <List disablePadding>
      {(userFavorites || []).map((note, i) => (
        <HomeNoteListItem
          shouldRenderDivider={(userFavorites || []).length - 1 !== i}
          note={note}
          key={note?.id}
        />
      ))}
    </List>
  );
};

export default ProfileTabFavorites;
