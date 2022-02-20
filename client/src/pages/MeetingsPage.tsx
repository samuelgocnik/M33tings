import React, { useEffect } from "react";
import EventList from "../components/Events/EventList";
import { useAppDispatch } from "../hooks/use-dispatch";
import { fetchEvents } from "../store/event-actions";

const MeetingsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("fetching events");
    dispatch(fetchEvents());
  }, [dispatch]);
  return <EventList />;
};

export default MeetingsPage;
