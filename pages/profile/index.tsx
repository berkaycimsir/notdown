import { Container, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import ProfilePageInputField, {
  UpdateProfileFieldNames,
} from '../../components/ui/Profile/Field';
import ProfilePageLoading from '../../components/ui/Profile/ProfilePageLoading';
import UpdateProfileImage from '../../components/ui/Profile/UpdateProfileImage';
import useMe from '../../hooks/useMe';
import { cloud } from '../../utils/file/cloudinary';

const Profile = () => {
  const { me, loading } = useMe();
  const profileImage = cloud.image(me?.profileImage as string).toURL();

  return (
    <Container maxWidth="md">
      {loading || !me ? (
        <ProfilePageLoading />
      ) : (
        <>
          <Typography fontWeight="bold" variant="h4">
            Your Profile
          </Typography>
          <Divider sx={{ mb: 5, mt: 2, borderColor: grey[200] }} />
          <ProfilePageInputField
            title="Full Name"
            field={UpdateProfileFieldNames.FULL_NAME}
            initialValue={me.fullName}
            description="Your name appears on your Profile page, as your byline, and in your responses. It is a required field."
          />
          <ProfilePageInputField
            field={UpdateProfileFieldNames.USERNAME}
            title="Username"
            initialValue={me.username}
          />
          <UpdateProfileImage profileImage={profileImage} />
          <ProfilePageInputField
            field={UpdateProfileFieldNames.EMAIL}
            title="Email"
            initialValue={me.email}
          />
        </>
      )}
    </Container>
  );
};

export default Profile;
