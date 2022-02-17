import React from "react";
import classes from "./EventListItem.module.css";
import "./DateTimeSelector.css";
import PointingRightFinger from "./../../assets/icons/pointing-right-finger.svg";
import { IEvent } from "../../models/Event";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";

const parseDate = (date: Date): string => {
  return (
    date.getDate().toString() +
    "/" +
    date.getMonth().toString() +
    "/" +
    date.getFullYear().toString() +
    "  " +
    date.getHours().toString() +
    ":" +
    date.getMinutes().toString()
  );
};

const EventListItem = (props: IEvent) => {
  const goingHandler = () => {};
  const interestedHandler = () => {};

  return (
    <Card className={classes.event}>
      <div className={classes["event__head"]}>
        <div className={classes["event__info"]}>
          <div className={classes["event__icon"]}>
            <img src={PointingRightFinger} alt="Right pointing finger icon" />
          </div>
          <div className={classes["event__summary"]}>
            <p>{parseDate(props.proceedings_time)}</p>
            {props.address && (
              <p>
                {props.address?.street +
                  ", " +
                  props.address?.city +
                  ", " +
                  props.address?.country}
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
            {props.all_participants
              .filter((x) => x.going)
              .map((x) => (
                <span>{x}</span>
              ))}
          </div>
          <div className={classes["participants"]}>
            <Button
              type="button"
              text="Interested"
              className={classes["event__join"]}
              onClick={interestedHandler}
            />
            {props.all_participants
              .filter((x) => !x.going)
              .map((x) => (
                <span>{x}</span>
              ))}
          </div>
        </div>
      </div>
      <div className={classes["event__created"]}>
        <span>
          {"Created " +
            parseDate(props.created_at) +
            " by '" +
            props.creator +
            "'"}
        </span>
      </div>
    </Card>
  );
};

export default EventListItem;
