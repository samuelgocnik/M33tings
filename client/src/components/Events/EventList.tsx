import React from "react";
import { Link } from "react-router-dom";
import { IEvent } from "../../models/Event";
import EventListItem from "./EventListItem";
import classes from "./EventList.module.css";
import { useAppSelector } from "../../hooks/use-selector";
import SadEmoji from "./../../assets/icons/sad-emoji.svg";
import { UiTitles } from "../../models/Ui";

const EventList = () => {
  const events = useAppSelector((state) => state.events.events);
  const notification = useAppSelector((state) => state.ui.notification);

  const listOfEvents = events.map((x: IEvent) => (
    <EventListItem key={x.id} {...x} />
  ));

  return (
    <>
      {notification.title === UiTitles.EventsSuccessfullyFetched &&
        (listOfEvents.length !== 0 ? (
          listOfEvents
        ) : (
          <div className={classes["no-events"]}>
            <div>
              <span>No upcoming events</span>
            </div>
            <img src={SadEmoji} alt="sad emoji" />
          </div>
        ))}
      <div className={classes["new-event__link"]}>
        <Link to="/new-meeting">Create a new Meeting</Link>
      </div>
    </>
  );
};

export default EventList;
