import React from 'react';
import { useGetNotesQuery } from '../../../generated/graphql';
import useMe from '../../../hooks/useMe';

const SavedNotes = () => {
  const { me } = useMe();
  const { data, loading } = useGetNotesQuery({
    variables: { authorId: String(me?.id) },
  });
  console.log(data);
  return <div>saved</div>;
};

export default SavedNotes;
