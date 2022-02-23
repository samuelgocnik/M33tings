import React from "react";
import classes from "./EventParticipants.module.css";
import "./DateTimeSelector.css";
import { IEventParticipant, IEventParticipants } from "../../models/Event";
import Button from "../UI/Button";

const EventParticipants = (props: IEventParticipants) => {
  const goingHandler = () => {};
  const interestedHandler = () => {};

  let isUserGoing: boolean = false;
  let isUserInterested: boolean = false;

  const going = props.participants
    ? props.participants
        .filter((x) => x.going)
        .map((x: IEventParticipant) => {
          isUserGoing = isUserGoing || x.id === props.userId;
          return <span key={x.id}>{x.name}</span>;
        })
    : [];
  const interested = props.participants
    ? props.participants
        .filter((x) => !x.going)
        .map((x: IEventParticipant) => {
          isUserInterested = isUserInterested || x.id === props.userId;
          return <span key={x.id}>{x.name}</span>;
        })
    : [];

  return (
    <div className={classes["event__participants"]}>
      <div className={classes["participants"]}>
        <Button
          type="button"
          text="Going"
          className={`${classes["event__join"]} ${
            isUserGoing && classes["event__join--active"]
          }`}
          onClick={goingHandler}
          disabled={false}
        />
        {going}
      </div>
      <div className={classes["participants"]}>
        <Button
          type="button"
          text="Interested"
          className={`${classes["event__join"]} ${
            isUserInterested && classes["event__join--active"]
          }`}
          onClick={interestedHandler}
          disabled={false}
        />
        {interested}
      </div>
    </div>
  );
};

export default EventParticipants;
