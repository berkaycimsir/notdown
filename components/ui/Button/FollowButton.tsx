import { LoadingButton } from '@mui/lab';
import { green, red } from '@mui/material/colors';
import { styled, experimental_sx as sx } from '@mui/material/styles';
import { unionBy } from 'lodash';
import React from 'react';
import { CustomModalTypes, useModalContext } from '../../../contexts/modal';
import {
  GetAuthorsByNameUserFragment,
  useFollowAuthorMutation,
  useUnfollowAuthorMutation,
} from '../../../generated/graphql';
import useMe from '../../../hooks/useMe';

const StyledButton = styled(LoadingButton)<{ $unfollow: boolean }>(
  ({ $unfollow }) =>
    sx({
      textTransform: 'none',
      borderRadius: 12,
      background: $unfollow ? red[400] : green[600],
      mt: 1,
      mr: 1,
      ':hover': {
        background: $unfollow ? red[400] : green[600],
        opacity: 0.9,
      },
    })
);

type Props = {
  author: {
    id: number;
    fullName: string;
    username: string;
    email: string;
    profileImage?: string | null | undefined;
  };
};

const FollowButton: React.FC<Props> = ({ author }) => {
  const { me, updateMeQuery } = useMe();
  const [followAuthor] = useFollowAuthorMutation();
  const [unfollowAuthor] = useUnfollowAuthorMutation();
  const { showModal } = useModalContext();

  const authorId = author.id;
  const alreadyFollowing = Boolean(me?.following.find((id) => id === authorId));

  const onFollowClick = () => {
    if (!me) return;
    followAuthor({
      variables: { authorId, userId: me.id },
      optimisticResponse: {
        followAuthor: {
          id: authorId,
          email: author.email,
          username: author.username,
          fullName: author.fullName,
          profileImage: author.profileImage,
        },
      },
      update: (_, { data }) => {
        if (!data?.followAuthor) return;
        updateMeQuery({
          me: {
            ...me,
            following: unionBy([authorId], me.following),
            userFollowing: unionBy([data.followAuthor], me.userFollowing),
          },
        });
      },
    });
  };

  const onUnfollowClick = () => {
    if (!me) return;
    unfollowAuthor({
      variables: { authorId, userId: me.id },
      optimisticResponse: {
        unfollowAuthor: {
          id: authorId,
          email: author.email,
          username: author.username,
          fullName: author.fullName,
          profileImage: author.profileImage,
        },
      },
      update: (_, { data }) => {
        if (!data?.unfollowAuthor?.id) return;
        updateMeQuery({
          me: {
            ...me,
            following: me.following.filter((id) => id !== authorId),
            userFollowing: (me.userFollowing || []).filter(
              (user) => user?.id !== authorId
            ),
          },
        });
      },
    });
  };

  const onFollowButtonClick = () => {
    if (!me) {
      showModal({ type: CustomModalTypes.SIGN_IN, showCloseButton: true });
    } else {
      if (alreadyFollowing) onUnfollowClick();
      else onFollowClick();
    }
  };

  return (
    <StyledButton
      $unfollow={alreadyFollowing}
      disableElevation
      disableFocusRipple
      disableRipple
      onClick={onFollowButtonClick}
      disableTouchRipple
      size="small"
      variant="contained"
    >
      {alreadyFollowing ? 'Unfollow' : 'Follow'}
    </StyledButton>
  );
};

export default FollowButton;
