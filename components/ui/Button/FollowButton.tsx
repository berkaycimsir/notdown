import { LoadingButton } from '@mui/lab';
import { green, red } from '@mui/material/colors';
import { styled, experimental_sx as sx } from '@mui/material/styles';
import { unionBy } from 'lodash';
import React from 'react';
import { useFollowAuthorMutation } from '../../../generated/graphql';
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
        opacity: 0.9,
      },
    })
);

type Props = {
  authorId: number;
};

const FollowButton: React.FC<Props> = ({ authorId }) => {
  const { me, updateMeQuery } = useMe();
  const [followAuthor] = useFollowAuthorMutation();

  const alreadyFollowing = Boolean(me?.followers.find((id) => id === authorId));

  const onFollowButtonClick = () => {
    if (!me) return;
    followAuthor({
      variables: { authorId, userId: me.id },
      optimisticResponse: { followAuthor: true },
      update: (_, { data }) => {
        if (!data?.followAuthor) return;
        updateMeQuery({
          me: {
            ...me,
            following: unionBy([authorId], me.following),
            userFollowing: unionBy([{ id: authorId }], me.userFollowing),
          },
        });
      },
    });
  };

  return (
    <StyledButton
      $unfollow={alreadyFollowing}
      disableElevation
      disableFocusRipple
      disableRipple
      disableTouchRipple
      size="small"
      variant="contained"
    >
      {alreadyFollowing ? 'Unfollow' : 'Follow'}
    </StyledButton>
  );
};

export default FollowButton;
