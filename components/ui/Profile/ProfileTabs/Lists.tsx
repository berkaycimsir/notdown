import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../../generated/graphql';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfleTabLists: React.FC<Props> = ({ user }) => {
  return <div>ProfleTabLists</div>;
};

export default ProfleTabLists;
