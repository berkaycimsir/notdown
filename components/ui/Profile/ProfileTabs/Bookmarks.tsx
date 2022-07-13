import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../../generated/graphql';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfleTabBookmarks: React.FC<Props> = ({ user }) => {
  return <div>ProfleTabLists</div>;
};

export default ProfleTabBookmarks;
