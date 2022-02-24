import React from "react";
import { UiTypes } from "../../../models/Ui";
import classes from "./Message.module.css";

interface IMessage {
  type: UiTypes;
  value: string;
}

const Message: React.FC<IMessage> = (props) => {
  if (props.type === UiTypes.None || props.type === UiTypes.Loading) {
    return <> </>;
  }
  return (
    <div
      className={`${classes["message"]} ${
        classes[UiTypes[props.type].toLowerCase()]
      }`}
    >
      <span>{props.value}</span>
    </div>
  );
};

export default Message;
