import { useRouter } from 'next/router';
import React from 'react';

const NoteDetails = () => {
  const router = useRouter();
  const noteId = router.query.id;

  return <div>NoteDetails {noteId}</div>;
};

export default NoteDetails;
