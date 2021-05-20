import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import moment from "moment";
import { useStateValue } from "../../contextApi/StateProvider";
import { useParams } from "react-router-dom";
import db from "../../config/firebase";
import firebase from "firebase";
import "./Chat.css";
const Chat = () => {
  const messagesEndRef = useRef(null);
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // scrollToBottom();
    setInput("");
  };
  // const scrollToBottom = () => {
  //   console.log("in scroll to bottom");
  //   console.log(messagesEndRef);
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/4.5/api/male/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
              {new Date(message.timestamp?.toDate())?.toDateString()}
              {", "}
              {new Date(message.timestamp?.toDate()).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          </p>
        ))}
        {/* <p style={{ height: "40px" }} ref={messagesEndRef}></p> */}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};
export default Chat;
