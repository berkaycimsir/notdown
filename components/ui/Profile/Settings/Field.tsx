import {
  Box,
  Typography,
  Button,
  styled,
  experimental_sx as sx,
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import React, { createRef, useRef } from 'react';
import { useToastsContext } from '../../../../contexts/toasts';
import { useUpdateUserProfileMutation } from '../../../../generated/graphql';
import useMe from '../../../../hooks/useMe';
import Input from '../../Input';

const StyledButton = styled(Button)<{
  $green?: boolean;
  $default?: boolean;
  $red?: boolean;
}>(({ $green, $default, $red }) =>
  sx({
    textTransform: 'none',
    borderRadius: 12,
    background: '#fff',
    border: `1px solid ${
      $default ? grey[400] : $green ? green[400] : red[400]
    }`,
    color: $default ? grey[600] : $green ? green[600] : red[600],
    px: 3,
    fontWeight: 800,
    height: 34,
    ':hover': {
      borderColor: $default ? grey[700] : $green ? green[700] : red[700],
      background: '#fff',
      color: $default ? grey[700] : $green ? green[700] : red[700],
    },
  })
);

export enum UpdateProfileFieldNames {
  FULL_NAME = 'fullName',
  USERNAME = 'username',
  EMAIL = 'email',
  PROFILE_IMAGE = 'profileImage',
  ABOUT = 'about',
}

type Props = {
  title: string;
  field: UpdateProfileFieldNames;
  initialValue: string;
  description?: string;
  multiline?: boolean;
};

const ProfilePageInputField: React.FC<Props> = ({
  title,
  initialValue,
  field,
  description,
  multiline = false,
}) => {
  const { me, updateMeQuery } = useMe();
  const inputRef = createRef<HTMLInputElement>();
  const [editing, setEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(initialValue);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const { showToast } = useToastsContext();

  const onEditButtonClick = () => {
    setEditing(true);
    inputRef?.current?.focus();
  };

  const onCancelButtonClick = () => {
    setInputValue(initialValue);
    setEditing(false);
  };

  const onSaveButtonClick = () => {
    if (!me) return;
    if (inputValue === initialValue) {
      setEditing(false);
      return;
    }
    const newUser = { ...me, [field]: inputValue };
    updateUserProfile({
      variables: {
        userId: me.id,
        newUser: {
          [field]: inputValue,
        },
      },
      optimisticResponse: {
        updateUserProfile: newUser,
      },
      update: (_, { data }) => {
        if (!data?.updateUserProfile) return;
        updateMeQuery({ me: newUser });
      },
    });
    showToast({
      type: 'success',
      message: `Your ${title.toLowerCase()} was updated successfully`,
    });
    setEditing(false);
  };

  return (
    <Box display="flex" mb={6} flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight="bold" variant="subtitle1">
          {title}
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          {editing ? (
            <>
              <StyledButton
                onClick={onCancelButtonClick}
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                variant="outlined"
                size="small"
                $red
              >
                Cancel
              </StyledButton>
              <StyledButton
                sx={{ ml: 2 }}
                disabled={!inputValue}
                onClick={onSaveButtonClick}
                disableElevation
                disableFocusRipple
                disableRipple
                $green
                disableTouchRipple
                variant="outlined"
                size="small"
              >
                Save
              </StyledButton>
            </>
          ) : (
            <StyledButton
              onClick={onEditButtonClick}
              disableElevation
              disableFocusRipple
              disableRipple
              disableTouchRipple
              $default
              variant="outlined"
              size="small"
            >
              Edit
            </StyledButton>
          )}
        </Box>
      </Box>
      <Input
        ref={inputRef}
        autoFocus
        fullWidth
        readOnly={!editing}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) =>
          e.key === 'Enter' &&
          field !== UpdateProfileFieldNames.ABOUT &&
          onSaveButtonClick()
        }
        multiline={multiline}
        minRows={4}
      />
      {description && (
        <Typography sx={{ mt: 2 }} variant="body2">
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ProfilePageInputField;
