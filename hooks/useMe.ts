import { gql, useQuery } from '@apollo/client';
import { User } from '@prisma/client';

type ReturnType = {
  me: User | null;
  loading: boolean;
};

const useMe = (): ReturnType => {
  const { data, loading } = useQuery(
    gql`
      query {
        me {
          id
          fullName
          username
          email
        }
      }
    `
  );

  const me = data?.me;

  return { me, loading };
};

export default useMe;
