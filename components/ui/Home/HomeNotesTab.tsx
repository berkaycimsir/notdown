import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import usePersistState from '../../../hooks/usePersistState';
import RecommendedNotes from './Recommended';
import FollowingNotes from './Following';
import useMe from '../../../hooks/useMe';
import { CustomModalTypes, useModalContext } from '../../../contexts/modal';

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

const HomeNotesTab = () => {
  const { me } = useMe();
  const { showModal } = useModalContext();

  const [{ value }, setValue] = usePersistState<{ value: number }>(
    'notdown-home-notes-tab-value',
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
          <StyledTab label="Recommended" />
          <StyledTab label="Following" />
        </StyledTabs>
        <Box sx={{ p: 2 }} />
        {value === 0 && <RecommendedNotes />}
        {value === 1 && <FollowingNotes />}
      </Box>
    </Box>
  );
};

export default HomeNotesTab;
