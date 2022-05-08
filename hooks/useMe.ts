import { ApolloQueryResult } from '@apollo/client';
import React from 'react';
import { MeQuery, useMeQuery, User } from '../generated/graphql';

type ReturnType = {
  me: MeQuery['me'];
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<MeQuery>>;
};

const useMe = (): ReturnType => {
  const { data, loading, refetch } = useMeQuery();

  const me = React.useMemo(() => data?.me, [data?.me]);

  return { me, loading, refetch };
};

export default useMe;
