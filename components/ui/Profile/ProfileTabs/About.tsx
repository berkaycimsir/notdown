import {
  Box,
  Divider,
  experimental_sx as sx,
  styled,
  Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';
import { GetAuthorByUsernameUserFragment } from '../../../../generated/graphql';
import { formatCreatedAt } from '../../../../utils/date';

const StyledTextButton = styled(Typography)(
  sx({
    color: green[600],
    cursor: 'pointer',
    fontFamily: 'Roboto',
    ':hover': {
      color: green[800],
    },
  })
);

type Props = {
  user: GetAuthorByUsernameUserFragment;
};

const ProfileTabAbout: React.FC<Props> = ({ user }) => {
  return (
    <Box>
      <Typography sx={{ whiteSpace: 'pre-line' }} variant="subtitle1">
        {user.about}
      </Typography>
      {user.about && <Divider sx={{ my: 4 }} />}
      <Typography variant="subtitle1" color="text.secondary">
        Notdown member since {formatCreatedAt(user.createdAt)}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <StyledTextButton variant="subtitle1">
          {user.userFollowers?.length} Followers
        </StyledTextButton>
        <Typography variant="subtitle1">·</Typography>
        <StyledTextButton variant="subtitle1">
          {user.userFollowing?.length} Following
        </StyledTextButton>
      </Box>
    </Box>
  );
};

export default ProfileTabAbout;
