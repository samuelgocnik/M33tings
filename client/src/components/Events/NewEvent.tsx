import React, { Fragment, useRef, useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input/Input';
import DateTimePicker from 'react-datetime-picker';

const NewEvent = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>(new Date());

  // const dateOnChangeHandler = (event: {
  //   target: { value: React.SetStateAction<Date> };
  // }) => {
  //   setDate(event.target.value);
  // };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(nameInputRef?.current?.value);
  };

  return (
    <Fragment>
      <form onSubmit={submitFormHandler}>
        <Input
          ref={nameInputRef}
          id="name"
          label="Name of the event"
          type="text"
          error_message="Enter a valid event name (at least 4 chars long)"
          validate={(data: string): boolean => data.trim().length > 4}
        />
        <DateTimePicker onChange={date => setDate(date)} value={date} />
        <Button
          type="submit"
          text="Add event"
          className=""
          onClick={() => {}}
        ></Button>
      </form>
    </Fragment>
  );
};

export default NewEvent;
