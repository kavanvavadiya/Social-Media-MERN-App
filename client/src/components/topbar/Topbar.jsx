import "./topbar.css";
import { Search, Person, Chat, Notifications, PersonAdd, Settings, Logout } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";

export default function Topbar() {
  const { user: currentUser } = useContext(AuthContext);

  const [user, setUser] = useState({});
  console.log( "this is user")
  console.log(user)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${currentUser._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser._id]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.setItem("user",null)
    setAnchorEl(null);
    window.location.reload();
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/' style={{textDecoration: 'none'}}>
        <span className="logo">Socialbook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/messenger`} className="topbarIconItem" style={{textDecoration:"none"}}>
          {/* <div className="topbarIconItem"> */}
            <Chat htmlColor="white" />
            <span className="topbarIconBadge">2</span>
          {/* </div> */}
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <img
            src={
              user.profilePicture
                ? PF + "person/" +user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>

        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
        {/* <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + "person/" +user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link> */}
      </div>
    </div>
  );
}