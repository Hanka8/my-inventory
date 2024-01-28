import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import TabLabels from './TabLabels';

const tabsData = [
  { label: 'Nela Maruškevič', a11yProps: index => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` }) },
  { label: 'o umělci', a11yProps: index => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` }) },
  { label: 'kontakt', a11yProps: index => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` }) },
  { label: 'cv', a11yProps: index => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` }) },
];

function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabLabels value={value} onChange={handleChange} tabs={tabsData} />
      </Box>
      {tabsData.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.label}
        </TabPanel>
      ))}
    </Box>
  );
}

export default BasicTabs;