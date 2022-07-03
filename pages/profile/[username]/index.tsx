import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ProfileHeader from '../../../components/ui/Profile/Header';
import ProfilePageLoading from '../../../components/ui/Profile/ProfilePageSkeleton';
import ProfileTabs from '../../../components/ui/Profile/ProfileTabs';
import { useGetAuthorByUsernameQuery } from '../../../generated/graphql';

const UserProfile = () => {
  const router = useRouter();
  const username = router.query.username as string;

  const { data, loading } = useGetAuthorByUsernameQuery({
    variables: { username },
  });

  const user = data?.getAuthorByUsername;

  return (
    <Container maxWidth="md">
      {loading || !user ? (
        <ProfilePageLoading />
      ) : (
        <Box>
          <ProfileHeader user={user} />
          <ProfileTabs user={user} />
        </Box>
      )}
    </Container>
  );
};

export default UserProfile;
