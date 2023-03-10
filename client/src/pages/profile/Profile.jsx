import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import EditProfile from "../../components/editProfile/EditProfile";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { ArrowBack, CameraAlt, CameraAltRounded, Cancel, Edit, Publish } from "@mui/icons-material";
import { Button } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import FriendList from "../../components/followerslist/FriendList";

export default function Profile() {

  const { user : currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [isEdit , setIsEdit] = useState(false)

  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const uploadImg = async (e) => {
    e.preventDefault();
    const userUpdate = {
      userId: currentUser._id,
    };
    console.log(profileFile)
    if (profileFile) {
      const data = new FormData();
      const fileName = currentUser.username + '_profilePic.jpeg';
      data.append("name", fileName);
      data.append("folder", 'person');
      data.append("file", profileFile);
      userUpdate.profilePicture = fileName;
      console.log(userUpdate);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    if (coverFile) {
      const data = new FormData();
      const fileName = currentUser.username + '_coverPic.jpeg';
      data.append("name", fileName);
      data.append("folder", 'person');
      data.append("file", coverFile);
      userUpdate.coverPicture = fileName;
      console.log(userUpdate);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.put("/users/"+ user._id, userUpdate);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
        <form className="profileCover" onSubmit={uploadImg}>

          {coverFile?  (
          <div className="profileCoverImgs">
            <img className="profileCoverImg" src={URL.createObjectURL(coverFile)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setCoverFile(null)} />
          </div>
        ):(
            <div className="profileCoverImgs">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + "person/" + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              {user.username === currentUser.username && (
              <label htmlFor="coverPic" className="shareOption">
              <span className="coverPicAdd">
                <CameraAlt /> {user.coverPicture ? "Change Cover Picture" : "Add Cover Picture"}
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                id="coverPic"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  setCoverFile(e.target.files[0])
                }}
                />
              </label>)}
            </div>)}
            {profileFile?  (
          <div className="profileUserImgs">
            <img className="profileUserImg" src={URL.createObjectURL(profileFile)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setProfileFile(null)} />
          </div>
        ) : (
          <div className="profileUserImgs">
          <img
           className="profileUserImg"
           src={
             user.profilePicture
             ? PF + "person/"+ user.profilePicture
             : PF + "person/noAvatar.png"
           }
           alt=""
           />
           {user.username === currentUser.username && (
           <label htmlFor="profilePic" className="shareOption">
           <span className="profilePicAdd"><CameraAltRounded className="cameraImg"/></span>
           <input
           style={{ display: "none" }}
           type="file"
           id="profilePic"
           accept=".png,.jpeg,.jpg"
           onChange={(e) => {
             setProfileFile(e.target.files[0])
           }}
           />
           </label>)}
         </div>
        )}
           {profileFile || coverFile ? (<div className="submitPics"><Button type="submit"startIcon={<Publish/>} variant="outlined">Update Pics</Button></div>) : ""}
            </form>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
                {user.username === currentUser.username && (
              !isEdit?<Button variant="outlined" onClick={()=> setIsEdit(!isEdit)}><Edit /> Edit Profile</Button> : <Button variant="outlined" onClick={()=> setIsEdit(!isEdit)}><ArrowBack /> Back</Button> )}
            </div>
          </div>
          <div className="profileRightBottom">
            {isEdit? (<EditProfile user = {user}/>) : (<>
            <FriendList user={user}/>
            <Feed username={username}/>
            <Rightbar user={user}/>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}