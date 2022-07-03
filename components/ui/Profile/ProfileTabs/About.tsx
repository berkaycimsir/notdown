import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../../generated/graphql';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfileTabAbout: React.FC<Props> = ({ user }) => {
  return <div>About</div>;
};

export default ProfileTabAbout;
