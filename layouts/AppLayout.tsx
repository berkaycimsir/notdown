import { styled, Container, Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import AppSidebar from '../components/Sidebar/AppSidebar';

const StyledAppLayout = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
});

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const isPublishingNew = React.useMemo(
    () => router.pathname === '/new',
    [router.pathname]
  );

  return (
    <StyledAppLayout maxWidth={isPublishingNew ? 'xl' : 'lg'}>
      {!isPublishingNew && <AppSidebar />}

      <Box width="100%" py={5} ml={5}>
        {children}
      </Box>
    </StyledAppLayout>
  );
};

export default AppLayout;
