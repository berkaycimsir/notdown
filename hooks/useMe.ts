import { ApolloQueryResult } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { MeQuery, useMeQuery, User } from '../generated/graphql';
import { removeToken } from '../utils/token';

type ReturnType = {
  me: MeQuery['me'];
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<MeQuery>>;
  signOut: () => Promise<void>;
  updateMeQuery: (newData: MeQuery) => void;
};

const useMe = (): ReturnType => {
  const router = useRouter();
  const { data, loading, refetch, updateQuery } = useMeQuery();

  const me = React.useMemo(() => data?.me, [data?.me]);

  const signOut = async () => {
    removeToken();
    router.push('/');
    await refetch();
  };

  const updateMeQuery = (newData: MeQuery) => {
    updateQuery((prev) => ({ ...prev, ...newData }));
  };

  return { me, loading, refetch, signOut, updateMeQuery };
};

export default useMe;
