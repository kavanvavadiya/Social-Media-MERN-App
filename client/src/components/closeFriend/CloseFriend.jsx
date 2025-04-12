import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({user,userId}) {

  const [friend, setFriend] = useState({});
  console.log(userId)
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setFriend(res.data);
    };
    if(userId){

      fetchUser();
    } 
  }, [userId]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <>
    {user ? 
    <li className="sidebarFriend">
      <Link to={`/profile/${user.username}`} style={{textDecoration :"none", display :"flex", alignItems: "center"}} >
      <img
           className="sidebarFriendImg"
           src={
             user.profilePicture
             ? PF + user.profilePicture
             : PF + "person/noAvatar.png"
           }
           alt=""
           />
      <span className="sidebarFriendName">{user.username}</span>
  </Link>
    </li> :
    <li className="sidebarFriend">
      <Link to={`/profile/${friend.username}`}  style={{textDecoration :"none", display :"flex", alignItems: "center"}}>
      <img
           className="sidebarFriendImg"
           src={
            friend.profilePicture
             ? PF + friend.profilePicture
             : PF + "person/noAvatar.png"
           }
           alt=""
           />
      <span className="sidebarFriendName">{friend.username}</span>
      </Link>
    </li>
  }
</>
  );
}