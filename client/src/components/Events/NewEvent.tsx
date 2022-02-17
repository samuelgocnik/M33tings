import React, { useRef, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useAppDispatch } from "../../hooks/use-dispatch";
import { useAppSelector } from "../../hooks/use-selector";
import { UiTypes } from "../../models/Ui";
import { uiActions } from "../../store/ui-slice";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import LoadingDots from "../UI/Loading/LoadingDots";
import Message from "../UI/Messages/Message";
import Cancel from "./../../assets/icons/cancel.svg";
import Check from "./../../assets/icons/check.svg";

import "./DateTimeSelector.css";

import classes from "./NewEvent.module.css";

const NewEvent = () => {
  const dispatch = useAppDispatch();
  const { showNotification } = uiActions;
  const notification = useAppSelector((state) => state.ui.notification);
  const current_date = new Date();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const noteInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>(current_date);
  const [includeAddress, setIncludeAddress] = useState<boolean>(false);

  // const dateOnChangeHandler = (event: {
  //   target: { value: React.SetStateAction<Date> };
  // }) => {
  //   setDate(event.target.value);
  // };

  const includeAddressHandler = () => {
    setIncludeAddress((prev) => {
      return !prev;
    });
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const name: string = nameInputRef.current?.value.trim() || "";
    const note: string = noteInputRef.current?.value.trim() || "";

    if (name.length < 4) {
      return dispatch(
        showNotification({
          type: UiTypes.Error,
          title: "Error",
          message: "Enter a valid data",
        })
      );
    }

    console.log(name, note, date);
  };

  return (
    <Card className={classes["new-event-form"]}>
      <h1 className={classes["new-event-form__heading"]}>Create a new event</h1>
      {notification.type === UiTypes.Error && (
        <Message type="error" value={notification.message} />
      )}
      <form onSubmit={submitFormHandler}>
        <Input
          ref={nameInputRef}
          id="name"
          label="Name of the event"
          type="text"
          error_message="Enter a valid event name (at least 4 chars long)"
          validate={(data: string): boolean => data.trim().length > 4}
        />
        <Input
          ref={nameInputRef}
          id="note"
          label="Note"
          type="text"
          error_message=""
          validate={(_: string): boolean => true}
        />
        <div className={classes["new-event-form__datetime"]}>
          <DateTimePicker
            onChange={(x) => setDate(x)}
            value={date}
            className="datetime-picker"
            format={"dd/MM/y HH:mm"}
            minDate={current_date}
            maxDate={
              new Date(
                current_date.getFullYear(),
                current_date.getMonth() + 6,
                current_date.getDate()
              )
            }
            clearIcon={null}
            disableClock={true}
          />
        </div>
        <button
          type="button"
          className={`${classes["new-event-form__address-button"]} ${
            includeAddress && classes["new-event-form__address-button--active"]
          }`}
          onClick={includeAddressHandler}
        >
          <span>Include address</span>
          {includeAddress && <img src={Check} alt="include address icon" />}
        </button>
        {includeAddress && (
          <div className={classes["new-event-form__address"]}>
            <Input
              ref={nameInputRef}
              id="street"
              label="Street"
              type="text"
              error_message="Enter a valid street"
              validate={(data: string): boolean => data.trim().length > 2}
            />
            <Input
              ref={nameInputRef}
              id="street_number"
              label="Street number"
              type="text"
              error_message="Enter a valid street number"
              validate={(data: string): boolean => data.trim().length > 1}
            />
            <Input
              ref={nameInputRef}
              id="city"
              label="City"
              type="text"
              error_message="Enter a valid city"
              validate={(data: string): boolean => data.trim().length > 2}
            />
            <Input
              ref={nameInputRef}
              id="country"
              label="Country"
              type="text"
              error_message="Enter a valid country"
              validate={(data: string): boolean => data.trim().length > 2}
            />
          </div>
        )}
        {notification.type === UiTypes.Loading && <LoadingDots />}
        {notification.type !== UiTypes.Loading && (
          <Button
            type="submit"
            text="Add event"
            className={classes["new-event-form__submit"]}
            onClick={() => {}}
          />
        )}
      </form>
    </Card>
  );
};

export default NewEvent;
