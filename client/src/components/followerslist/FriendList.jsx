import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import CloseFriend from '../closeFriend/CloseFriend';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
export default function FriendList({user}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
const followers = user.followers;
const followings = user.followings;
console.log(followers);
  return (
    <>
      <Box >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Followings" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          {followers? (followers.map((u) => (
            <CloseFriend key={u} userId={u} />))) : "No Followers"
           } 
      </TabPanel>
      <TabPanel value={value} index={1}>
      {followings? (followings.map((u) => (
            <CloseFriend key={u} userId={u} />))) : ("No Followings")
           } 
      </TabPanel>
    </Box>
  </>
  )
}
