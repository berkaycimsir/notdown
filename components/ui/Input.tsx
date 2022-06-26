import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { grey, red } from '@mui/material/colors';
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
    prop !== '$isOutlined' &&
    prop !== '$size' &&
    prop !== '$fullWidth' &&
    prop !== '$hasError',
})<{
  $isOutlined: boolean;
  $size: InputSize;
  $fullWidth: boolean;
  $hasError: boolean;
}>(({ $isOutlined, $size, $fullWidth, $hasError }) =>
  sx({
    p: $size === 'small' ? 0.5 : 0.9,
    display: 'flex',
    alignItems: 'center',
    width: $fullWidth ? '100%' : 'fit-content',
    background: $isOutlined ? grey[50] : 'inherit',
    borderRadius: '6px',
    mt: 2,
    ...($hasError && { border: `0.8px solid ${red[600]}` }),
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

const StyledErrorText = styled(Typography)(
  sx({
    color: red[600],
    fontWeight: 500,
  })
);

interface Props extends Omit<InputBaseProps, 'size'> {
  containerProps?: PaperProps;
  variant?: PaperProps['variant'];
  size?: InputSize;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  endIcon?: React.ReactNode;
  hasError?: boolean;
  errorText?: string;
  onEndIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  {
    containerProps,
    variant = 'outlined',
    startIcon,
    size = 'small',
    fullWidth = false,
    onEndIconClick,
    hasError = false,
    errorText = '',
    endIcon,
    ...props
  },
  ref
) {
  return (
    <>
      <StyledInputContainer
        variant={variant}
        $size={size}
        $isOutlined={variant === 'outlined'}
        $fullWidth={fullWidth}
        $hasError={hasError}
        {...containerProps}
      >
        {startIcon && (
          <Box ml={0.4}>
            <IconButton disabled size="small" aria-label="directions">
              {startIcon}
            </IconButton>
          </Box>
        )}
        <StyledInput inputProps={{ ref }} $size={size} {...props} />
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
      {hasError && (
        <StyledErrorText variant="caption">{errorText}</StyledErrorText>
      )}
    </>
  );
});

export default Input;
