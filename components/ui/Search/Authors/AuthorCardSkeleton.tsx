import { Card, CardHeader, Skeleton, CardContent, Box } from '@mui/material';
import React from 'react';
import HomeNoteListItemSkeleton from '../../Home/HomeNoteListItemSkeleton';

const AuthorCardSkeleton = () => {
  return (
    <Box>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="24%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="12%" />}
        />
        <CardContent>
          <Box p={1}>
            <Skeleton animation="wave" height={24} width="52%" sx={{ mb: 2 }} />
            <HomeNoteListItemSkeleton />
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ width: '100%', my: 4 }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="24%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="12%" />}
        />
        <CardContent>
          <Box p={1}>
            <Skeleton
              animation="wave"
              height={16}
              width="100%"
              sx={{ mb: 2 }}
            />
            <Skeleton animation="wave" height={16} width="100%" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthorCardSkeleton;
