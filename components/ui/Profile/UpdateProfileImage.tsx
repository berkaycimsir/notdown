import { CameraAltRounded } from '@mui/icons-material';
import { Box, Typography, ButtonBase, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useRef } from 'react';
import { ClipLoader } from 'react-spinners';
import { useToastsContext } from '../../../contexts/toasts';
import { useUpdateUserProfileMutation } from '../../../generated/graphql';
import useMe from '../../../hooks/useMe';
import { UploadPresets, UploadFolders } from '../../../utils/file/types';
import { uploadImage } from '../../../utils/file/upload';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: 120,
  height: 120,
  borderRadius: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  borderRadius: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const CameraIconWrapper = styled('span')(({ theme }) => ({
  borderRadius: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  borderRadius: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: grey[700],
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

type Props = {
  profileImage?: string;
};

const UpdateProfileImage: React.FC<Props> = ({ profileImage }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { me, updateMeQuery } = useMe();
  const { showToast } = useToastsContext();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const onUpload = async (files: FileList | null) => {
    if (!me || !files) return;
    setLoading(true);
    await uploadImage({
      file: files[0] as File,
      preset: UploadPresets.PROFILE_IMAGE,
      folder: UploadFolders.PROFILE_IMAGE,
      onSuccess: async (file) => {
        setLoading(false);
        const newUser = { ...me, profileImage: file.public_id };
        updateUserProfile({
          variables: {
            userId: me.id,
            newUser: {
              profileImage: file.public_id,
            },
          },
          optimisticResponse: {
            updateUserProfile: newUser,
          },
          update: (_, { data }) => {
            const newImage = data?.updateUserProfile?.profileImage;
            if (!newImage) return;
            updateMeQuery({
              me: newUser,
            });
          },
        });
        showToast({
          type: 'success',
          message: 'Your profile image was updated successfully',
        });
      },
      onFail: () => {
        showToast({
          type: 'error',
          message: 'Oops, something went wrong. Please try again',
        });
      },
    });
    if (inputRef?.current?.value) inputRef.current.value = '';
  };

  return (
    <Box
      display="flex"
      mb={6}
      mt={8}
      width="70%"
      flexDirection="row"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column">
        <Typography fontWeight="bold" variant="subtitle1">
          Profile Image
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2">
          Your profile image appears on your Profile page and with your stories
          across Medium.
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2">
          Recommended size: Square, at least 1000 pixels per side. File type:
          JPG, PNG or GIF.
        </Typography>
      </Box>

      <Box
        onClick={(e) => {
          e.stopPropagation();
          inputRef?.current?.click?.();
        }}
        ml={5}
      >
        <ImageButton focusRipple>
          <ImageSrc style={{ backgroundImage: `url(${profileImage})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <CameraIconWrapper>
            {loading ? (
              <ClipLoader color={grey[200]} />
            ) : (
              <CameraAltRounded htmlColor={grey[200]} />
            )}
          </CameraIconWrapper>
        </ImageButton>

        <input
          onChange={(e) => onUpload(e.target.files)}
          hidden
          ref={inputRef}
          id="photo-upload"
          type="file"
        />
      </Box>
    </Box>
  );
};

export default UpdateProfileImage;
