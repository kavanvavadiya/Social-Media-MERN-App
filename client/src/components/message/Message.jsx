import "./message.css";
import moment from 'moment';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Message({ message, own }) {
    const [user,setUser] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() => {
        const getUser = async () => {
          try {
            const res = await axios.get("/users/?userId=" + message.sender);
            setUser(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [message]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Link
          to={"/profile/" + user?.username}
          style={{ textDecoration: "none" }}
        >

            <img
            className="messageImg"
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        </Link>

        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{moment(new Date(message.createdAt)).fromNow()}</div>
    </div>
  );
}