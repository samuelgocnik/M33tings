import React from "react";
import classes from "./EventListItem.module.css";
import "./DateTimeSelector.css";
import PointingRightFinger from "./../../assets/icons/pointing-right-finger.svg";
import { IEvent, IEventParticipant } from "../../models/Event";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import { format } from "date-fns";

const EventListItem = (props: IEvent) => {
  const goingHandler = () => {};
  const interestedHandler = () => {};

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

  return (
    <Card className={classes.event}>
      <div className={classes["event__head"]}>
        <div className={classes["event__info"]}>
          <div className={classes["event__icon"]}>
            <img src={PointingRightFinger} alt="Right pointing finger icon" />
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
            />
            {going}
          </div>
          <div className={classes["participants"]}>
            <Button
              type="button"
              text="Interested"
              className={classes["event__join"]}
              onClick={interestedHandler}
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
      </div>
    </Card>
  );
};

export default EventListItem;
