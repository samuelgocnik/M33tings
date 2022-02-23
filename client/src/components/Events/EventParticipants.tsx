import React from "react";
import classes from "./EventListItem.module.css";
import "./DateTimeSelector.css";
import PointingRightFingerClear from "./../../assets/icons/pointing-right-finger-clear.svg";
import PointingRightFingerSecondary from "./../../assets/icons/pointing-right-finger-secondary.svg";
import { IEvent, IEventParticipant } from "../../models/Event";
import Button from "../UI/Button";
import { useAppSelector } from "../../hooks/use-selector";

const EventParticipants = (props: { participants: IEventParticipant[] }) => {
  const userId: number = useAppSelector((state) => state.auth.user?.id) || 0;

  const goingHandler = () => {};
  const interestedHandler = () => {};

  const going = props.participants
    ? props.participants
        .filter((x) => x.going)
        .map((x: IEventParticipant) => <span key={x.id}>{x.name}</span>)
    : [];
  const interested = props.participants
    ? props.participants
        .filter((x) => !x.going)
        .map((x: IEventParticipant) => <span key={x.id}>{x.name}</span>)
    : [];

  return (
    <div className={classes["event__participants"]}>
      <div className={classes["participants"]}>
        <Button
          type="button"
          text="Going"
          className={classes["event__join"]}
          onClick={goingHandler}
          disabled={false}
        />
        {going}
      </div>
      <div className={classes["participants"]}>
        <Button
          type="button"
          text="Interested"
          className={classes["event__join"]}
          onClick={interestedHandler}
          disabled={false}
        />
        {interested}
      </div>
    </div>
  );
};

export default EventParticipants;
