import React from 'react';
import { useMeQuery, User } from '../generated/graphql';

type ReturnType = {
  me: User | null | undefined;
  loading: boolean;
};

const useMe = (): ReturnType => {
  const { data, loading } = useMeQuery();

  const me = React.useMemo(() => data?.me, [data?.me]);

  return { me, loading };
};

export default useMe;
