import React from 'react';
import { Backdrop, styled } from '@mui/material';
import { HashLoader } from 'react-spinners';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const MarkdownPreviewLoader: React.FC = () => {
  return (
    <StyledBackdrop open>
      <HashLoader size={32} color="#fff" />
    </StyledBackdrop>
  );
};

export default MarkdownPreviewLoader;
