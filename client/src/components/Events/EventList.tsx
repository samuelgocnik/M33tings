import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IEvent } from "../../models/Event";
import EventListItem from "./EventListItem";
import classes from "./EventList.module.css";
import { useAppSelector } from "../../hooks/use-selector";
import SadEmoji from "./../../assets/icons/sad-emoji.svg";
import { UiTitles } from "../../models/Ui";
import { useAppDispatch } from "../../hooks/use-dispatch";
import Button from "../UI/Button";
import { fetchEvents } from "../../store/event-actions";

const EventList = () => {
  console.log("rendering event list");

  const events = useAppSelector((state) => state.events.events);
  const notification = useAppSelector((state) => state.ui.notification);
  const dispatch = useAppDispatch();

  const [offset, setOffset] = useState<number>(0);
  const [allowFetching, setAllowFetching] = useState<boolean>(true);

  useEffect(() => {
    if (notification.title === UiTitles.NoMoreEventsToFetch) {
      setAllowFetching(false);
    }
  }, [notification.title]);

  const loadEventsHandler = useCallback(() => {
    dispatch(fetchEvents(false, 5, offset + 5));
    setOffset(offset + 5);
  }, [dispatch, offset]);

  const listOfEvents = events.map((x: IEvent) => (
    <EventListItem key={x.id} {...x} />
  ));

  return (
    <>
      {notification.title !== UiTitles.FetchingEvents &&
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
      <div>
        <Button
          type="button"
          className={classes["event-list__load"]}
          text={
            allowFetching ? "Load more events..." : "No more events to fetch"
          }
          disabled={!allowFetching}
          onClick={loadEventsHandler}
        />
      </div>
      <div className={classes["new-event__link"]}>
        <Link to="/new-meeting">Create a new Meeting</Link>
      </div>
    </>
  );
};

export default EventList;
