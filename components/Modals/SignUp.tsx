import {
  LockRounded,
  MailRounded,
  PersonRounded,
  PersonSearchRounded,
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
import { useSignUpMutation } from '../../generated/graphql';
import Input from '../Input';
import { saveToken } from '../../utils/token';
import useMe from '../../hooks/useMe';
import { CustomModalTypes, useModalContext } from '../../contexts/modal';
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

const StyledLink = styled(Typography)(({ theme }) =>
  sx({
    fontWeight: 600,
    ml: '6px',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline',
  })
);

interface IFormValues {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

const defaultValues: IFormValues = {
  fullName: '',
  username: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const { hideModal, showModal } = useModalContext();
  const { showToast } = useToastsContext();
  const { refetch } = useMe();
  const [signUp] = useSignUpMutation();
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
      const { data } = await signUp({
        variables: {
          ...formValues,
        },
      });

      const token = data?.createUser.token;
      const error = data?.createUser.error;

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
    [signUp, reset, showToast, hideModal, refetch]
  );

  return (
    <StyledContainer maxWidth="xs">
      <StyledWelcomeBackText variant="h4">Join Notdown</StyledWelcomeBackText>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fullName"
          control={control}
          rules={{ required: true }}
          render={({ field, formState: { errors } }) => (
            <Input
              fullWidth
              hasError={Boolean(errors.fullName)}
              errorText="This field is required"
              startIcon={<PersonRounded fontSize="small" />}
              placeholder="full name"
              {...field}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field, formState: { errors } }) => (
            <Input
              fullWidth
              hasError={Boolean(errors.username)}
              errorText="This field is required"
              startIcon={<PersonSearchRounded fontSize="small" />}
              placeholder="username"
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field, formState: { errors } }) => (
            <Input
              fullWidth
              hasError={Boolean(errors.email)}
              errorText="This field is required"
              startIcon={<MailRounded fontSize="small" />}
              placeholder="email"
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
          color="secondary"
          disableFocusRipple
          disableTouchRipple
        >
          Sign Up
        </StyledButton>
      </StyledForm>

      <StyledDivider />

      <StyledBottomText variant="subtitle1">
        Already have an account ?
        <StyledLink
          onClick={() =>
            showModal({ type: CustomModalTypes.SIGN_IN, showCloseButton: true })
          }
          variant="subtitle2"
        >
          Sign In
        </StyledLink>
      </StyledBottomText>
    </StyledContainer>
  );
};

export default SignUp;
