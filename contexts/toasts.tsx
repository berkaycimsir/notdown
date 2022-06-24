import { AlertProps, SnackbarProps } from '@mui/material';
import React from 'react';
import { createContext, useContext } from 'react';
import ToastNotification from '../components/ui/ToastNotification';

type ToastProps = {
  type: AlertProps['severity'];
  onClose?: () => void;
} & SnackbarProps;

const ToastsContext = createContext<{
  showToast: (props: ToastProps) => void;
  isToastVisible: boolean;
  hideToast: () => void;
}>({
  showToast: () => {},
  isToastVisible: false,
  hideToast: () => {},
});

export const useToastsContext = () => useContext(ToastsContext);

const ToastsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isToastVisible, setIsToastVisible] = React.useState<boolean>(false);
  const [toastProps, setToastProps] = React.useState<ToastProps>({
    type: 'success',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    autoHideDuration: 3000,
    open: true,
    message: '',
  });

  const showToast = React.useCallback(
    (props: ToastProps) => {
      setToastProps({ ...toastProps, ...props });
      setIsToastVisible(true);
    },
    [toastProps]
  );

  const hideToast = React.useCallback(() => {
    setIsToastVisible(false);
  }, [setIsToastVisible]);

  return (
    <ToastsContext.Provider value={{ showToast, hideToast, isToastVisible }}>
      {children}
      {isToastVisible && (
        <ToastNotification hideToast={hideToast} {...toastProps} />
      )}
    </ToastsContext.Provider>
  );
};

export default ToastsContextProvider;
