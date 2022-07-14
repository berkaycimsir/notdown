import { BookmarkAddOutlined, MoreHorizRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  styled,
  Typography,
  experimental_sx as sx,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React from 'react';
import { NotesQueryNoteFragment } from '../../../generated/graphql';
import { formatCreatedAt } from '../../../utils/date';
import { cloud } from '../../../utils/file/cloudinary';
import { readingTime, wordCount } from '../../../utils/markdown';
import NoteDetailsActions from './Actions';

type Props = {
  note: NotesQueryNoteFragment;
};

const NoteDetailsHeader: React.FC<Props> = ({ note }) => {
  const router = useRouter();
  const author = note.author;
  const authorPicture = cloud.image(author.profileImage as string).toURL();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
    >
      <Box display="flex" alignItems="center" flexDirection="row">
        <Avatar
          src={authorPicture}
          onClick={() => router.push(`/profile/${author.username}`)}
          sx={{
            cursor: 'pointer',
            width: 48,
            height: 48,
            ':hover': { opacity: 0.7 },
          }}
        />

        <Box display="flex" ml={2} flexDirection="column">
          <Typography variant="subtitle1">{author.fullName}</Typography>
          <Typography sx={{ color: grey[600] }} variant="subtitle2">
            {formatCreatedAt(note.createdAt)} ·{' '}
            {readingTime(String(note?.markdown))} min read (
            {wordCount(String(note?.markdown))} words)
          </Typography>
        </Box>
      </Box>

      <NoteDetailsActions note={note} />
    </Box>
  );
};

export default NoteDetailsHeader;
