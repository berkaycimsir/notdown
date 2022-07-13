import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import usePersistState from '../../../hooks/usePersistState';
import useMe from '../../../hooks/useMe';
import { CustomModalTypes, useModalContext } from '../../../contexts/modal';
import BookmarkedNotes from './Bookmarked';
import FavoritedNotes from './Favorited';

const StyledTabs = styled(Tabs)({
  borderBottom: '0.5px solid #ddd',
  '& .MuiTabs-indicator': {
    backgroundColor: grey[900],
    height: 0.5,
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: grey[700],
  '&:hover': {
    color: grey[900],
    opacity: 1,
  },
  '&.Mui-selected': {
    color: grey[900],
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: grey[900],
  },
}));

const BookmarksTabs = () => {
  const { me } = useMe();
  const { showModal } = useModalContext();

  const [{ value }, setValue] = usePersistState<{ value: number }>(
    'notdown-bookmarks-tab-value',
    {
      value: 0,
    }
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 1 && !me) {
      showModal({ type: CustomModalTypes.SIGN_IN, showCloseButton: true });
      return;
    }
    setValue({ value: newValue });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: '#fff' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="ant example"
        >
          <StyledTab label="Bookmarks" />
          <StyledTab label="Favorited" />
        </StyledTabs>
        <Box sx={{ p: 2 }} />
        {value === 0 && <BookmarkedNotes />}
        {value === 1 && <FavoritedNotes />}
      </Box>
    </Box>
  );
};

export default BookmarksTabs;
