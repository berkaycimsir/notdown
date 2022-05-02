import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import {
  Box,
  experimental_sx as sx,
  InputBaseProps,
  PaperProps,
  styled,
} from '@mui/material';

type InputSize = 'small' | 'large';

const StyledInputContainer = styled(Paper, {
  shouldForwardProp: (prop) =>
    prop !== '$isOutlined' && prop !== '$size' && prop !== '$fullWidth',
})<{ $isOutlined: boolean; $size: InputSize; $fullWidth: boolean }>(
  ({ $isOutlined, $size, $fullWidth }) =>
    sx({
      p: $size === 'small' ? 0.5 : 0.9,
      display: 'flex',
      alignItems: 'center',
      width: $fullWidth ? '100%' : 'fit-content',
      background: $isOutlined ? grey[50] : 'inherit',
      borderRadius: '6px',
      mt: 2,
    })
);

const StyledInput = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== '$size',
})<{ $size: InputSize }>(({ $size }) =>
  sx({
    mx: 1,
    flex: 1,
    fontSize: $size === 'small' ? 14 : 15,
  })
);

interface Props extends Omit<InputBaseProps, 'size'> {
  variant?: PaperProps['variant'];
  size?: InputSize;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  endIcon?: React.ReactNode;
  onEndIconClick?: () => void;
}

const Input: React.FC<Props> = ({
  variant = 'outlined',
  startIcon,
  size = 'small',
  fullWidth = false,
  onEndIconClick,
  endIcon,
  ...props
}) => {
  return (
    <StyledInputContainer
      variant={variant}
      $size={size}
      $isOutlined={variant === 'outlined'}
      $fullWidth={fullWidth}
    >
      {startIcon && (
        <Box ml={0.4}>
          <IconButton disabled size="small" aria-label="directions">
            {startIcon}
          </IconButton>
        </Box>
      )}
      <StyledInput $size={size} {...props} />
      {endIcon && (
        <>
          <Divider sx={{ height: 22, mr: 1 }} orientation="vertical" />
          <IconButton
            onClick={() => onEndIconClick?.()}
            size="small"
            aria-label="directions"
          >
            {endIcon}
          </IconButton>
        </>
      )}
    </StyledInputContainer>
  );
};

export default Input;
