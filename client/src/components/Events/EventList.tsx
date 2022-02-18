import React from "react";
import { Link } from "react-router-dom";
import { IEvent, IEventAddress } from "../../models/Event";
import EventListItem from "./EventListItem";
import classes from "./EventList.module.css";
import { useAppSelector } from "../../hooks/use-selector";

const EventList = () => {
  const events = useAppSelector((state) => state.events.events);

  const listOfEvents = events.map((x: IEvent) => (
    <EventListItem key={x.id} {...x} />
  ));

  return (
    <>
      <div>{listOfEvents}</div>
      <div className={classes["new-event__link"]}>
        <Link to="/new-meeting">Create a new Meeting</Link>
      </div>
    </>
  );
};

export default EventList;
