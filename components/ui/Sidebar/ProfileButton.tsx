import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Face, MoreHorizRounded } from '@mui/icons-material';
import {
  styled,
  experimental_sx as sx,
  Avatar,
  Divider,
  Box,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import useMe from '../../../hooks/useMe';
import { useRouter } from 'next/router';
import { CustomModalTypes, useModalContext } from '../../../contexts/modal';
import { cloud } from '../../../utils/file/cloudinary';

const StyledButton = styled(Typography)(
  sx({
    m: 2.5,
    color: grey[700],
    cursor: 'pointer',
    ':hover': {
      color: grey[900],
    },
  })
);

const StyledProfileImage = styled(Avatar)({
  width: 36,
  height: 36,
});

const StyledProfileButton = styled(Box)(
  sx({
    m: 2.5,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  })
);

type Props = {
  navigateToProfile: () => void;
};

const ProfileButton: React.FC<Props> = ({ navigateToProfile }) => {
  const router = useRouter();
  const { showModal } = useModalContext();
  const { me, signOut } = useMe();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!me) {
        showModal({ type: CustomModalTypes.SIGN_IN, showCloseButton: true });
      } else setAnchorEl(event.currentTarget);
    },
    [me, showModal]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = React.useMemo(() => (open ? 'simple-popover' : undefined), [open]);

  const profileImage = cloud.image(me?.profileImage as string).toURL();

  const onSignOutButtonClick = React.useCallback(async () => {
    await signOut();
    setAnchorEl(null);
    router.push('/');
  }, [router, signOut]);

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick} size="small">
        {me ? (
          <StyledProfileImage src={profileImage} />
        ) : (
          <Face sx={{ fontSize: 28 }} />
        )}
      </IconButton>
      <Popover
        PaperProps={{
          variant: 'outlined',
          sx: { minWidth: 240 },
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <StyledButton onClick={onSignOutButtonClick} variant="subtitle2">
          Sign Out
        </StyledButton>

        <StyledButton
          onClick={() => router.push(`/profile/${me?.username}/settings`)}
          variant="subtitle2"
        >
          Settings
        </StyledButton>

        <Divider />

        <StyledProfileButton onClick={navigateToProfile}>
          <StyledProfileImage src={profileImage} />
          <Box ml={2}>
            <Typography fontWeight="normal" variant="subtitle2">
              {me?.fullName}
            </Typography>
            <Typography
              fontWeight="normal"
              fontSize={12}
              variant="subtitle2"
              color="text.secondary"
            >
              @{me?.username}
            </Typography>
          </Box>
        </StyledProfileButton>
      </Popover>
    </div>
  );
};

export default ProfileButton;
