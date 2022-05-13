import { ApolloQueryResult } from '@apollo/client';
import React from 'react';
import { MeQuery, useMeQuery, User } from '../generated/graphql';
import { removeToken } from '../utils/token';

type ReturnType = {
  me: MeQuery['me'];
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<MeQuery>>;
  signOut: () => Promise<void>;
};

const useMe = (): ReturnType => {
  const { data, loading, refetch } = useMeQuery();

  const me = React.useMemo(() => data?.me, [data?.me]);

  const signOut = React.useCallback(async () => {
    removeToken();
    await refetch();
  }, [refetch]);

  return { me, loading, refetch, signOut };
};

export default useMe;
