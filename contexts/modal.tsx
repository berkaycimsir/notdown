import React, { createContext, useCallback, useContext, useState } from 'react';
import SignIn from '../components/Modals/SignIn';
import SignUp from '../components/Modals/SignUp';
import useBreakPoints from '../hooks/useBreakPoints';
import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { grey } from '@mui/material/colors';

export enum CustomModalTypes {
  CUSTOM = 0,
  SIGN_IN = 1,
  SIGN_UP = 2,
}

export type ModalPropsType = {
  type: CustomModalTypes;
  showCloseButton?: boolean;
  onClose?: () => void;
  customContent?: any;
  maxWidth?: DialogProps['maxWidth'];
};

const getModalContent = ({ type, customContent }: ModalPropsType) => {
  switch (type) {
    case CustomModalTypes.CUSTOM:
      return customContent;
    case CustomModalTypes.SIGN_IN:
      return <SignIn />;
    case CustomModalTypes.SIGN_UP:
      return <SignUp />;
    default:
      return null;
  }
};

const ModalContext = createContext<{
  showModal: (props: ModalPropsType) => void;
  isModalVisible: boolean;
  type?: CustomModalTypes;
}>({
  showModal: () => {},
  isModalVisible: false,
  type: undefined,
});

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { sm } = useBreakPoints();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<ModalPropsType>({
    type: CustomModalTypes.CUSTOM,
    customContent: null,
    showCloseButton: false,
    maxWidth: 'md',
  });

  const showModal = useCallback((props: ModalPropsType) => {
    setModalProps({ ...props });
    setIsModalVisible(true);
  }, []);

  const { showCloseButton, onClose, type, maxWidth } = modalProps;

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
    onClose?.();
  }, [onClose]);

  const modalContent = React.useMemo(
    () => getModalContent(modalProps),
    [modalProps]
  );

  return (
    <ModalContext.Provider
      value={{
        showModal,
        isModalVisible,
        type,
      }}
    >
      {children}
      <Dialog
        fullWidth
        maxWidth={maxWidth}
        fullScreen={sm}
        open={isModalVisible}
        onClose={hideModal}
        PaperProps={{
          variant: 'outlined',
        }}
      >
        {showCloseButton && (
          <DialogTitle>
            <Box display="flex" alignItems="center" flexDirection="row">
              <div style={{ flex: 1 }} />
              <IconButton onClick={hideModal} size="small">
                <Close htmlColor={grey[500]} />
              </IconButton>
            </Box>
          </DialogTitle>
        )}
        <DialogContent>
          <Box mt={showCloseButton ? 2 : 0}>{modalContent}</Box>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};
