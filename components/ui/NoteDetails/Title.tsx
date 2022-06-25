import { Typography } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
};

const NoteDetailsTitle: React.FC<Props> = ({ title }) => {
  return (
    <Typography sx={{ my: 6 }} variant="h4" fontWeight="bold">
      {title}
    </Typography>
  );
};

export default NoteDetailsTitle;
