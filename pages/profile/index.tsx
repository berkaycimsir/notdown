import {
  Container,
  Divider,
  Typography,
  Box,
  Button,
  styled,
  experimental_sx as sx,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import Input from '../../components/Input';
import ProfilePageInputField from '../../components/Profile/Field';
import UpdateProfileImage from '../../components/Profile/UpdateProfileImage';
import { useToastsContext } from '../../contexts/toasts';
import { useUpdateUserProfileImageMutation } from '../../generated/graphql';
import useMe from '../../hooks/useMe';
import { cloud } from '../../utils/file/cloudinary';
import { UploadFolders, UploadPresets } from '../../utils/file/types';
import { uploadImage } from '../../utils/file/upload';

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
