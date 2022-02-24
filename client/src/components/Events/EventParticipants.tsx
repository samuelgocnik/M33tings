import React from "react";
import classes from "./EventParticipants.module.css";
import "./DateTimeSelector.css";
import { IEventParticipant, IEventParticipants } from "../../models/Event";
import Button from "../UI/Button";
import { useAppDispatch } from "../../hooks/use-dispatch";
import {
  addParticipantToEvent,
  deleteEventParticipant,
  updateEventParticipant,
} from "../../store/event-actions";
import { useAppSelector } from "../../hooks/use-selector";

const EventParticipants = (props: IEventParticipants) => {
  let isUserGoing: boolean = false;
  let isUserInterested: boolean = false;
  let userParticipantEventId: number = 0;
  const dispatch = useAppDispatch();
  const name: string = useAppSelector((state) => state.auth.user?.name) || "";

  const goingHandler = () => {
    if (isUserGoing) {
      // delete participant record
      dispatch(
        deleteEventParticipant({ id: userParticipantEventId }, props.eventId)
      );
    } else if (isUserInterested) {
      // update participant record
      dispatch(
        updateEventParticipant(
          {
            id: userParticipantEventId,
            going: true,
          },
          props.eventId
        )
      );
    } else {
      // create participant record with going on true
      dispatch(
        addParticipantToEvent(
          {
            userId: props.userId,
            eventId: props.eventId,
            going: true,
          },
          name
        )
      );
    }
  };
  const interestedHandler = () => {
    if (isUserInterested) {
      // delete participant record
      dispatch(
        deleteEventParticipant({ id: userParticipantEventId }, props.eventId)
      );
    } else if (isUserGoing) {
      // update participant record
      dispatch(
        updateEventParticipant(
          {
            id: userParticipantEventId,
            going: false,
          },
          props.eventId
        )
      );
    } else {
      // create participant record with false going
      dispatch(
        addParticipantToEvent(
          {
            userId: props.userId,
            eventId: props.eventId,
            going: false,
          },
          name
        )
      );
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
