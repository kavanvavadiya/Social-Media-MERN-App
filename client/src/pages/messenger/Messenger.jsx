import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { io } from "socket.io-client";

export default function Messenger() {
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            Conversons
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            CurrentChat
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            ChatOnline
          </div>
        </div>
      </div>
    </>
  );
}