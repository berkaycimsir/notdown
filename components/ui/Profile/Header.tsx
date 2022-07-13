import { Box, Typography } from '@mui/material';
import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../generated/graphql';
import FollowButton from '../Button/FollowButton';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfileHeader: React.FC<Props> = ({ user }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <Typography fontWeight="bold" variant="h4">
        {user.fullName}
      </Typography>
      <FollowButton author={user} />
    </Box>
  );
};

export default ProfileHeader;
