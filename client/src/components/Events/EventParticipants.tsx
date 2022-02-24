import React from "react";
import classes from "./EventParticipants.module.css";
import "./DateTimeSelector.css";
import { IEventParticipant, IEventParticipants } from "../../models/Event";
import Button from "../UI/Button";

const EventParticipants = (props: IEventParticipants) => {
  let isUserGoing: boolean = false;
  let isUserInterested: boolean = false;
  let userParticipantEventId: number = 0;

  const goingHandler = () => {
    if (isUserGoing) {
      // delete participant record
    } else if (isUserInterested) {
      // update participant record
    } else {
      // create participant record with going on true
    }
  };
  const interestedHandler = () => {
    if (isUserInterested) {
      // delete participant record
    } else if (isUserGoing) {
      // update participant record
    } else {
      // create participant record with false going
    }
  };

  const going = props.participants
    .filter((x) => x.going)
    .map((x: IEventParticipant) => {
      if (x.userId === props.userId) {
        isUserGoing = true;
        userParticipantEventId = x.id;
      }
      return <span key={x.id}>{x.name}</span>;
    });

  const interested = props.participants
    .filter((x) => !x.going)
    .map((x: IEventParticipant) => {
      if (x.userId === props.userId) {
        isUserInterested = true;
        userParticipantEventId = x.id;
      }
      return <span key={x.id}>{x.name}</span>;
    });
    
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
