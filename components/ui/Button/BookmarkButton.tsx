import { BookmarkAdded, BookmarkAddOutlined } from '@mui/icons-material';
import { styled, experimental_sx as sx, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { unionBy } from 'lodash';
import React from 'react';
import { CustomModalTypes, useModalContext } from '../../../contexts/modal';
import {
  NotesQueryNoteFragment,
  useBookmarkNoteMutation,
  useUnbookmarkNoteMutation,
} from '../../../generated/graphql';
import useMe from '../../../hooks/useMe';

const StyledBookmarkIcon = styled(BookmarkAddOutlined)(
  sx({
    color: grey[700],
    ':hover': {
      color: grey[900],
    },
  })
);

const StyledUnbookmarkIcon = styled(BookmarkAdded)(
  sx({
    color: grey[700],
  })
);

type Props = {
  note: NotesQueryNoteFragment;
};

const BookmarkButton: React.FC<Props> = ({ note }) => {
  const { me, updateMeQuery } = useMe();

  const [bookmarkNote] = useBookmarkNoteMutation();
  const [unbookmarkNote] = useUnbookmarkNoteMutation();
  const { showModal } = useModalContext();

  const noteId = note.id;
  const alreadyBookmarked = Boolean(me?.bookmarks.find((id) => id === note.id));
  if (!noteId) return null;

  const onBookmarkClick = () => {
    if (!me) return;
    bookmarkNote({
      variables: { noteId, userId: me.id },
      optimisticResponse: {
        bookmarkNote: {
          id: me.id,
          email: me.email,
          username: me.username,
          fullName: me.fullName,
          profileImage: me.profileImage,
        },
      },
      update: (_, { data }) => {
        if (!data?.bookmarkNote) return;
        updateMeQuery({
          me: {
            ...me,
            bookmarks: unionBy([noteId], me.bookmarks),
            userBookmarks: unionBy([note], me.userBookmarks),
          },
        });
      },
    });
  };

  const onUnbookmarkClick = () => {
    if (!me) return;
    unbookmarkNote({
      variables: { noteId, userId: me.id },
      optimisticResponse: {
        unbookmarkNote: {
          id: me.id,
          email: me.email,
          username: me.username,
          fullName: me.fullName,
          profileImage: me.profileImage,
        },
      },
      update: (_, { data }) => {
        if (!data?.unbookmarkNote?.id) return;
        updateMeQuery({
          me: {
            ...me,
            bookmarks: me.bookmarks.filter((id) => id !== noteId),
            userBookmarks: me.userBookmarks?.filter((n) => n?.id !== noteId),
          },
        });
      },
    });
  };

  const onBookmarkButtonClick = () => {
    if (!me) {
      showModal({ type: CustomModalTypes.SIGN_IN, showCloseButton: true });
    } else {
      if (alreadyBookmarked) onUnbookmarkClick();
      else onBookmarkClick();
    }
  };

  return (
    <IconButton onClick={onBookmarkButtonClick} sx={{ mr: 1 }} size="small">
      {alreadyBookmarked ? <StyledUnbookmarkIcon /> : <StyledBookmarkIcon />}
    </IconButton>
  );
};

export default BookmarkButton;
