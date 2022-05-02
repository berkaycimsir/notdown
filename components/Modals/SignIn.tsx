import {
  LockRounded,
  PersonRounded,
  VisibilityOff,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Container,
  styled,
  Typography,
  experimental_sx as sx,
  Divider,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSignInMutation } from '../../generated/graphql';
import Input from '../Input';
import Link from '../Link';
import { saveToken } from '../../utils/token';
import useMe from '../../hooks/useMe';
import { useModalContext } from '../../contexts/modal';
import { useToastsContext } from '../../contexts/toasts';
import { getAuthErrorMessage } from '../../utils/auth';

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

const StyledForm = styled('form')(
  sx({
    marginTop: 4,
    width: '100%',
  })
);

const StyledButton = styled(LoadingButton)(
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

interface IFormValues {
  usernameOrEmail: string;
  password: string;
}

const defaultValues: IFormValues = {
  usernameOrEmail: '',
  password: '',
};

const SignIn = () => {
  const { hideModal } = useModalContext();
  const { showToast } = useToastsContext();
  const { refetch } = useMe();
  const [signIn] = useSignInMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<IFormValues>({
    defaultValues,
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const onEndIconClick = React.useCallback(
    () => setShowPassword(!showPassword),
    [setShowPassword, showPassword]
  );

  const onSubmit = React.useCallback(
    async (formValues: IFormValues) => {
      const { data } = await signIn({
        variables: {
          username: formValues.usernameOrEmail,
          email: formValues.usernameOrEmail,
          password: formValues.password,
        },
      });

      const token = data?.signIn.token || '';
      const error = data?.signIn.error;

      reset();
      showToast({
        type: error ? 'error' : 'success',
        message: getAuthErrorMessage(error, 'sign-in'),
      });

      if (token) {
        saveToken(token);
        hideModal();
        await refetch();
      }
    },
    [signIn, reset, showToast, hideModal, refetch]
  );

  return (
    <StyledContainer maxWidth="xs">
      <StyledWelcomeBackText variant="h4">Welcome Back</StyledWelcomeBackText>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="usernameOrEmail"
          control={control}
          rules={{ required: true }}
          render={({ field, formState: { errors } }) => (
            <Input
              fullWidth
              hasError={Boolean(errors.usernameOrEmail)}
              errorText="This field is required"
              startIcon={<PersonRounded fontSize="small" />}
              placeholder="username or email"
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field, formState: { errors } }) => (
            <Input
              fullWidth
              startIcon={<LockRounded fontSize="small" />}
              placeholder="password"
              type={showPassword ? 'text' : 'password'}
              {...field}
              hasError={Boolean(errors.password)}
              errorText="This field is required"
              onEndIconClick={onEndIconClick}
              endIcon={
                !showPassword ? (
                  <VisibilityOutlined fontSize="small" htmlColor={grey[500]} />
                ) : (
                  <VisibilityOff fontSize="small" htmlColor={grey[500]} />
                )
              }
            />
          )}
        />

        <StyledButton
          type="submit"
          fullWidth
          loading={isSubmitting}
          variant="outlined"
          disableFocusRipple
          disableTouchRipple
        >
          Sign In
        </StyledButton>
      </StyledForm>

      <StyledDivider />

      <StyledBottomText variant="subtitle1">
        Don{"'"}t have an account yet ?
        <StyledLink href="/sign-up">Sign Up</StyledLink>
      </StyledBottomText>
    </StyledContainer>
  );
};

export default SignIn;
