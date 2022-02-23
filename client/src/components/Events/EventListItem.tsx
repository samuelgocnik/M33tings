import React from "react";
import classes from "./EventListItem.module.css";
import "./DateTimeSelector.css";
import PointingRightFingerClear from "./../../assets/icons/pointing-right-finger-clear.svg";
import PointingRightFingerSecondary from "./../../assets/icons/pointing-right-finger-secondary.svg";
import { IEvent, IEventParticipant } from "../../models/Event";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import { format } from "date-fns";
import Edit from "./../../assets/icons/edit.svg";
import Delete from "./../../assets/icons/trash.svg";
import { useAppSelector } from "../../hooks/use-selector";

const EventListItem = (props: IEvent) => {
  const userId: number = useAppSelector((state) => state.auth.user?.id) || 0;

  const goingHandler = () => {};
  const interestedHandler = () => {};

  const deleteEventHandler = () => {};
  const editEventHandler = () => {};

  const going = props.allParticipants
    ? props.allParticipants
        .filter((x) => x.going)
        .map((x: IEventParticipant) => <span key={x.id}>{x.name}</span>)
    : [];
  const interested = props.allParticipants
    ? props.allParticipants
        .filter((x) => !x.going)
        .map((x: IEventParticipant) => <span key={x.id}>{x.name}</span>)
    : [];

  const pointingFinger =
    Math.abs(new Date().getTime() - new Date(props.proceedingsTime).getTime()) /
      1000 <
    24 * 60 * 60
      ? PointingRightFingerSecondary
      : PointingRightFingerClear;

  return (
    <Card className={classes.event}>
      <div className={classes["event__head"]}>
        <div className={classes["event__info"]}>
          <div className={classes["event__icon"]}>
            <img src={pointingFinger} alt="Right pointing finger icon" />
          </div>
          <div className={classes["event__summary"]}>
            <p>{format(new Date(props.proceedingsTime), "dd/MM/yyyy H:mm")}</p>
            <p>{props.name}</p>
            {props.address && (
              <p>
                {`${props.address?.street} ${props.address?.streetNumber}, ${props.address?.city}, ${props.address?.country}`}
              </p>
            )}
            {props.note && <p>{props.note}</p>}
          </div>
        </div>
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
      </div>
      <div className={classes["event__created"]}>
        <span>
          {`Created ${format(
            new Date(props.createdAt),
            "dd/MM/yyyy H:mm"
          )} by '${props.creator}'`}
        </span>
        {userId === props.creatorId && (
          <div>
            <button
              onClick={editEventHandler}
              className={classes["event__action"]}
            >
              <img src={Edit} alt="edit icon" />
            </button>
            <button
              onClick={deleteEventHandler}
              className={classes["event__action"]}
            >
              <img src={Delete} alt="delete icon" />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EventListItem;
