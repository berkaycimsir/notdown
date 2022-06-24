import React from 'react';
import Snackbar, {
  SnackbarCloseReason,
  SnackbarProps,
} from '@mui/material/Snackbar';
import { Alert, Slide, AlertProps } from '@mui/material';

type Props = {
  type: AlertProps['severity'];
  onClose?: () => void;
  hideToast: () => void;
} & SnackbarProps;

const ToastNotification: React.FC<Props> = ({
  open,
  message,
  type,
  hideToast,
  onClose,
  ...props
}) => {
  const handleClose = React.useCallback(
    (
      _: Event | React.SyntheticEvent<any, Event>,
      reason: SnackbarCloseReason
    ) => {
      if (reason !== 'clickaway') {
        hideToast();
        onClose?.();
      }
    },
    [onClose, hideToast]
  );

  const onCloseIconClick = React.useCallback(() => {
    hideToast();
    onClose?.();
  }, [onClose, hideToast]);

  return (
    <Snackbar
      {...props}
      TransitionComponent={(props) => <Slide {...props} />}
      open
      onClose={handleClose}
    >
      <Alert onClose={onCloseIconClick} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
