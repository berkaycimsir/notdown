import {
  LockRounded,
  PersonRounded,
  VisibilityOff,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Button,
  Container,
  styled,
  Typography,
  experimental_sx as sx,
  Divider,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import Input from '../Input';
import Link from '../Link';

const StyledContainer = styled(Container)(
  sx({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    my: 8,
  })
);

const StyledWelcomeBackText = styled(Typography)(
  sx({
    fontWeight: 400,
    fontStyle: 'italic',
  })
);

const StyledButton = styled(Button)(
  sx({
    textTransform: 'none',
    mt: 3,
    borderRadius: '8px',
  })
);

const StyledDivider = styled(Divider)(
  sx({
    width: '100%',
    mt: 4,
    borderColor: grey[100],
  })
);

const StyledBottomText = styled(Typography)(
  sx({
    color: 'GrayText',
    mt: 2,
    fontSize: 14,
  })
);

const StyledLink = styled(Link)(({ theme }) =>
  sx({
    fontWeight: 600,
    ml: '6px',
    color: theme.palette.secondary.main,
  })
);

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const onEndIconClick = React.useCallback(
    () => setShowPassword(!showPassword),
    [setShowPassword, showPassword]
  );

  return (
    <StyledContainer maxWidth="xs">
      <StyledWelcomeBackText variant="h4">Welcome Back</StyledWelcomeBackText>

      <form style={{ marginTop: 24, width: '100%' }}>
        <Input
          fullWidth
          startIcon={<PersonRounded fontSize="small" />}
          placeholder="username or email"
        />

        <Input
          fullWidth
          startIcon={<LockRounded fontSize="small" />}
          placeholder="password"
          type={showPassword ? 'text' : 'password'}
          onEndIconClick={onEndIconClick}
          endIcon={
            !showPassword ? (
              <VisibilityOutlined fontSize="small" htmlColor={grey[500]} />
            ) : (
              <VisibilityOff fontSize="small" htmlColor={grey[500]} />
            )
          }
        />

        <StyledButton
          fullWidth
          variant="text"
          disableFocusRipple
          disableTouchRipple
        >
          Sign In
        </StyledButton>
      </form>

      <StyledDivider />

      <StyledBottomText variant="subtitle1">
        Don{"'"}t have an account yet ?
        <StyledLink href="/sign-up">Sign Up</StyledLink>
      </StyledBottomText>
    </StyledContainer>
  );
};

export default SignIn;
