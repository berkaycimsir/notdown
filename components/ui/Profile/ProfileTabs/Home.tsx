import { Alert, AlertTitle, List } from '@mui/material';
import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../../generated/graphql';
import HomeNoteListItem from '../../Home/HomeNoteListItem';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfileTabHome: React.FC<Props> = ({ user }) => {
  return (
    <List disablePadding>
      {user.publishedNotes?.length === 0 ? (
        <Alert severity="info">
          <AlertTitle>
            This user hasn&apos;t published any notes yet.
          </AlertTitle>
          Follow him to get notified when he published new one!
        </Alert>
      ) : (
        (user.publishedNotes || []).map((note, i) => (
          <HomeNoteListItem
            shouldRenderDivider={(user.publishedNotes || []).length - 1 !== i}
            note={note}
            key={note?.id}
          />
        ))
      )}
    </List>
  );
};

export default ProfileTabHome;
