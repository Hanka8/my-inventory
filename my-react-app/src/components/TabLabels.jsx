import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

const AntTabs = styled(Tabs)({
  borderBottom: '10px solid #000000',
  '& .MuiTabs-indicator': {
    backgroundColor: "transparent",
    borderBottom: '5px solid #666666',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily:
    'Expletus Sans',
  '&:hover': {
    color: '#b66857',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#b66857',
    fontWeight: theme.typography.fontWeightBold,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));


function TabLabels({ value, onChange, tabs }) {
  return (
    <AntTabs 
      value={value} 
      onChange={onChange} 
      aria-label="basic tabs example" 
      variant='fullWidth'
    >
      {tabs.map((tab, index) => (
        <AntTab key={index} label={tab.label} {...tab.a11yProps(index)} />
      ))}
    </AntTabs>
  );
}

export default TabLabels;
