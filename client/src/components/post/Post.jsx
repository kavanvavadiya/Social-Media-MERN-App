import "./post.css";
import { Delete, Edit,MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import moment from 'moment';
import { IconButton, Menu, MenuItem } from "@mui/material";

export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler =()=>{
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => { 
    try {
      const userId = {
        userId: currentUser._id,
      };
      axios.delete(`/posts/${post._id}`,{data : userId});
      console.log(post.userId)
      console.log(currentUser._id)
    } catch (err) {}
    setAnchorEl(null);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + "person/" + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{moment(new Date(post.createdAt)).fromNow()}</span>
          </div>
          {post.userId === currentUser._id && (
      <div className="postTopRight">
        <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
<MenuItem onClick={handleClose} disableRipple>
          <Edit />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple>
          <Delete />
          Delete
        </MenuItem>
      </Menu>
          </div>
          )}
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + 'post/'+ post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF + "like.png"} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={PF + "heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}