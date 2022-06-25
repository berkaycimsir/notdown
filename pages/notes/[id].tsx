import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import NoteDetailsContent from '../../components/ui/NoteDetails/Content';
import NoteDetailsFooter from '../../components/ui/NoteDetails/Footer';
import NoteDetailsHeader from '../../components/ui/NoteDetails/Header';
import NoteDetailsTitle from '../../components/ui/NoteDetails/Title';
import { useGetNoteByIdQuery } from '../../generated/graphql';

const NoteDetails = () => {
  const router = useRouter();
  const noteId = parseInt(router.query.id as string) as number;

  const { data, loading } = useGetNoteByIdQuery({
    variables: { noteId },
  });

  const note = data?.getNoteById;

  if (loading || !note) return <div>loading...</div>;

  return (
    <Container sx={{ mt: 2 }} maxWidth="md">
      <NoteDetailsHeader note={note} />
      <NoteDetailsTitle title={note.title} />
      <NoteDetailsContent content={note.markdown} />
      <NoteDetailsFooter note={note} />
    </Container>
  );
};

export default NoteDetails;
