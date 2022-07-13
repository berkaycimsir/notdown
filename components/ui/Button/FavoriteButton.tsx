import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import {
  Box,
  styled,
  experimental_sx as sx,
  IconButton,
  Typography,
} from '@mui/material';
import { yellow, grey } from '@mui/material/colors';
import { unionBy } from 'lodash';
import React from 'react';
import { CustomModalTypes, useModalContext } from '../../../contexts/modal';
import {
  GetNoteByIdDocument,
  GetNoteByIdQuery,
  GetNoteByIdQueryVariables,
  useFavoriteNoteMutation,
  useUnfavoriteNoteMutation,
} from '../../../generated/graphql';
import useMe from '../../../hooks/useMe';

const StyledFavoriteIcon = styled(StarBorderRounded)(
  sx({
    color: yellow[600],
  })
);

const StyledUnfavoriteIcon = styled(StarRounded)(
  sx({
    color: yellow[600],
  })
);

type Props = {
  favoriteCount: number;
  noteId: number;
};

const FavoriteButton: React.FC<Props> = ({ favoriteCount, noteId }) => {
  const { me, updateMeQuery } = useMe();

  const [favoriteNote] = useFavoriteNoteMutation();
  const [unfavoriteNote] = useUnfavoriteNoteMutation();
  const { showModal } = useModalContext();

  const alreadyFavorited = Boolean(me?.favorites.find((id) => id === noteId));

  if (!noteId || !me?.id) return null;

  const onFavoriteClick = () => {
    if (!me) return;
    favoriteNote({
      variables: { noteId, userId: me.id },
      optimisticResponse: {
        favoriteNote: {
          id: me.id,
          email: me.email,
          username: me.username,
          fullName: me.fullName,
          profileImage: me.profileImage,
        },
      },
      update: (cache, { data }) => {
        if (!data?.favoriteNote) return;
        updateMeQuery({
          me: {
            ...me,
            favorites: unionBy([noteId], me.favorites),
          },
        });

        cache.updateQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(
          {
            query: GetNoteByIdDocument,
            variables: { noteId },
          },
          (prev) => ({
            ...prev,
            // @ts-ignore
            getNoteById: {
              ...prev?.getNoteById,
              favorites: unionBy(
                [
                  {
                    id: me.id,
                    email: me.email,
                    username: me.username,
                    fullName: me.fullName,
                    profileImage: me.profileImage,
                  },
                ],
                prev?.getNoteById?.favorites
              ),
            },
          })
        );
      },
    });
  };

  const onUnfavoriteClick = () => {
    if (!me) return;
    unfavoriteNote({
      variables: { noteId, userId: me.id },
      optimisticResponse: {
        unfavoriteNote: {
          id: me.id,
          email: me.email,
          username: me.username,
          fullName: me.fullName,
          profileImage: me.profileImage,
        },
      },
      update: (cache, { data }) => {
        if (!data?.unfavoriteNote?.id) return;
        updateMeQuery({
          me: {
            ...me,
            favorites: me.favorites.filter((id) => id !== noteId),
          },
        });

        cache.updateQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(
          {
            query: GetNoteByIdDocument,
            variables: { noteId },
          },
          (prev) => ({
            ...prev,
            // @ts-ignore
            getNoteById: {
              ...prev?.getNoteById,
              favorites: unionBy(
                (prev?.getNoteById?.favorites || []).filter(
                  (u) => u?.id !== me.id
                )
              ),
            },
          })
        );
      },
    });
  };

  const onFavoriteButtonClick = () => {
    if (!me) {
      showModal({ type: CustomModalTypes.SIGN_IN, showCloseButton: true });
    } else {
      if (alreadyFavorited) onUnfavoriteClick();
      else onFavoriteClick();
    }
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <IconButton onClick={onFavoriteButtonClick} sx={{ mr: 1 }} size="small">
        {alreadyFavorited ? <StyledUnfavoriteIcon /> : <StyledFavoriteIcon />}
      </IconButton>
      <Typography fontWeight="normal" color={grey[700]} variant="caption">
        {favoriteCount}
      </Typography>
    </Box>
  );
};

export default FavoriteButton;
