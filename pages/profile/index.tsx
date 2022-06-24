import { Container, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import ProfilePageInputField from '../../components/ui/Profile/Field';
import UpdateProfileImage from '../../components/ui/Profile/UpdateProfileImage';
import useMe from '../../hooks/useMe';
import { cloud } from '../../utils/file/cloudinary';

const Profile = () => {
  const { me } = useMe();
  const profileImage = cloud.image(me?.profileImage as string).toURL();

  return (
    <Container maxWidth="md">
      <Typography fontWeight="bold" variant="h4">
        Your Profile
      </Typography>
      <Divider sx={{ mb: 5, mt: 2, borderColor: grey[200] }} />
      <ProfilePageInputField
        title="Full Name"
        initialValue={me?.fullName as string}
        description="        Your name appears on your Profile page, as your byline, and in your
        responses. It is a required field."
      />
      <ProfilePageInputField
        title="Username"
        initialValue={me?.username as string}
      />
      <UpdateProfileImage profileImage={profileImage} />
      <ProfilePageInputField title="Email" initialValue={me?.email as string} />
    </Container>
  );
};

export default Profile;
