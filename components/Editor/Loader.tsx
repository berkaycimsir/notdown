import React from 'react';
import { Backdrop, styled } from '@mui/material';
import BeatLoader from 'react-spinners/BeatLoader';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const EditorLoader: React.FC = () => {
  return (
    <StyledBackdrop open>
      <BeatLoader size={16} color="#fff" />
    </StyledBackdrop>
  );
};

export default EditorLoader;
