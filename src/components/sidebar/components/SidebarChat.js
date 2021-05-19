import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
export const SidebarChat = ({ addNewChat }) => {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, []);
  const createChat = () => {
    const roomName = prompt("please enter name for chat");
    if (roomName) {
      // do some stuff here
      console.log(roomName);
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/4.5/api/male/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <div className="sidebarChat__info">
        <h2>Add new Chat</h2>
      </div>
    </div>
  );
};
export default SidebarChat;
