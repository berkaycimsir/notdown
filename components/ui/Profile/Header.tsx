import { Box, Typography } from '@mui/material';
import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../generated/graphql';

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfileHeader: React.FC<Props> = ({ user }) => {
  return (
    <Box mb={5}>
      <Typography fontWeight="bold" variant="h4">
        {user.fullName}
      </Typography>
    </Box>
  );
};

export default ProfileHeader;
