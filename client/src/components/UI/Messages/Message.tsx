import React from "react";
import classes from "./Message.module.css";

interface IMessage {
  type: "success" | "error";
  value: string;
}

const Message: React.FC<IMessage> = (props) => {
  return (
    <div className={`${classes["message"]} ${classes[props.type]}`}>
      <span>{props.value}</span>
    </div>
  );
};

export default Message;
