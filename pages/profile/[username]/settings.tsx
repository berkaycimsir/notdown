import { Container, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import ProfilePageInputField, {
  UpdateProfileFieldNames,
} from '../../../components/ui/Profile/Settings/Field';
import ProfileSettingsPageLoading from '../../../components/ui/Profile/Settings/ProfileSettingsPageLoading';
import UpdateProfileImage from '../../../components/ui/Profile/Settings/UpdateProfileImage';
import useMe from '../../../hooks/useMe';
import { cloud } from '../../../utils/file/cloudinary';

const ProfileSettings = () => {
  const { me, loading } = useMe();
  const profileImage = cloud.image(me?.profileImage as string).toURL();

  return (
    <Container maxWidth="md">
      {loading || !me ? (
        <ProfileSettingsPageLoading />
      ) : (
        <>
          <Typography fontWeight="bold" variant="h4">
            Profile Settings
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
          <ProfilePageInputField
            field={UpdateProfileFieldNames.ABOUT}
            title="About"
            initialValue={me.about || ''}
            multiline
          />
        </>
      )}
    </Container>
  );
};

export default ProfileSettings;
