import { createTheme } from '@mui/material/styles';
import { indigo, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[400],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    allVariants: {
      color: '#292929',
    },
    fontFamily: 'Lora, sans-serif',
  },
});

export default theme;
