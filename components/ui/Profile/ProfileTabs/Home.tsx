import { List } from '@mui/material';
import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../../generated/graphql';
import HomeNoteListItem from '../../Home/HomeNoteListItem';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfileTabHome: React.FC<Props> = ({ user }) => {
  return (
    <List disablePadding>
      {(user.publishedNotes || []).map((note, i) => (
        <HomeNoteListItem
          shouldRenderDivider={(user.publishedNotes || []).length - 1 !== i}
          note={note}
          key={note?.id}
        />
      ))}
    </List>
  );
};

export default ProfileTabHome;
