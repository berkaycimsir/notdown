import { useMediaQuery, useTheme } from '@mui/material';

type ReturnType = {
  [breakpoint: string]: boolean;
};

const useBreakPoints = (): ReturnType => {
  const theme = useTheme();
  const breakpoints = theme.breakpoints;

  const xs = useMediaQuery(breakpoints.down('xs'));
  const sm = useMediaQuery(breakpoints.down('sm'));
  const md = useMediaQuery(breakpoints.down('md'));
  const lg = useMediaQuery(breakpoints.down('lg'));
  const xl = useMediaQuery(breakpoints.down('xl'));

  return { xs, sm, md, lg, xl };
};

export default useBreakPoints;
