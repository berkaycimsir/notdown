import { styled, Container, Box } from '@mui/material';
import React from 'react';
import AppSidebar from '../components/Sidebar/AppSidebar';

const StyledAppLayout = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
});

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledAppLayout maxWidth="lg">
      <AppSidebar />

      <Box width="100%" py={5} ml={5}>
        {children}
      </Box>
    </StyledAppLayout>
  );
};

export default AppLayout;
