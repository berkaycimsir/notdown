import {
  Box,
  Typography,
  Button,
  styled,
  experimental_sx as sx,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { createRef, useRef } from 'react';
import Input from '../Input';

const StyledButton = styled(Button)(
  sx({
    textTransform: 'none',
    borderRadius: 12,
    background: '#fff',
    border: `1px solid ${grey[400]}`,
    color: grey[600],
    px: 3,
    fontWeight: 800,
    height: 34,
    ':hover': {
      borderColor: grey[700],
      background: '#fff',
      color: grey[700],
    },
  })
);

type Props = {
  title: string;
  initialValue: string;
  description?: string;
};

const ProfilePageInputField: React.FC<Props> = ({
  title,
  initialValue,
  description,
}) => {
  const inputRef = createRef<HTMLInputElement>();
  const [readOnly, setReadOnly] = React.useState(true);
  const onEditButtonClick = () => {
    setReadOnly(false);
    inputRef?.current?.focus();
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
        <StyledButton
          onClick={onEditButtonClick}
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
          variant="outlined"
          size="small"
        >
          Edit
        </StyledButton>
      </Box>
      <Input
        ref={inputRef}
        autoFocus
        fullWidth
        readOnly={readOnly}
        value={initialValue}
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
