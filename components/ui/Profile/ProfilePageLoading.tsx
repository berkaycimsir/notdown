import { Box, Skeleton } from '@mui/material';
import React from 'react';

const ProfilePageLoading = () => {
  return (
    <Box mt={2}>
      <Skeleton width="36%" height={32} />
      <Skeleton sx={{ my: 2 }} width="100%" height={12} />
      <Box display="flex" mt={6} flexDirection="column">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Skeleton width="16%" height={16} />
          <Box display="flex" flexDirection="row" alignItems="center">
            <Skeleton sx={{ borderRadius: 6, px: 4, py: 2 }} />
          </Box>
        </Box>
        <Skeleton width="100%" height={64} />
      </Box>
      <Box display="flex" mt={6} flexDirection="column">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Skeleton width="16%" height={16} />
          <Box display="flex" flexDirection="row" alignItems="center">
            <Skeleton sx={{ borderRadius: 6, px: 4, py: 2 }} />
          </Box>
        </Box>
        <Skeleton width="100%" height={64} />
      </Box>
      <Box
        width="70%"
        display="flex"
        mt={6}
        flexDirection="row"
        alignItems="center"
      >
        <Box width="100%" display="flex" flexDirection="column">
          <Skeleton width="36%" sx={{ mb: 5 }} height={18} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="65%" height={16} sx={{ mb: 4 }} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="42%" height={16} />
        </Box>

        <Skeleton
          width={180}
          height={200}
          sx={{ borderRadius: '100%', ml: 7 }}
        />
      </Box>
    </Box>
  );
};

export default ProfilePageLoading;
