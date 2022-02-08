import React, { useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Message from '../UI/Messages/Message';

import './DateTimeSelector.css';

import classes from './NewEvent.module.css';

const NewEvent = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const noteInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>('');

  // const dateOnChangeHandler = (event: {
  //   target: { value: React.SetStateAction<Date> };
  // }) => {
  //   setDate(event.target.value);
  // };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const name: string = nameInputRef.current?.value.trim() || '';
    const note: string = noteInputRef.current?.value.trim() || '';

    if (name.length < 4) {
      return setError('Enter a valid name');
    }

    console.log(name, date.toString());
    setError('');
  };

  return (
    <Card className={classes['new-event-form']}>
      <h1 className={classes['new-event-form__heading']}>Create a new event</h1>
      {error && <Message type="error" value={error} />}
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
        <div className={classes['new-event-form__datetime']}></div>
        <Button
          type="submit"
          text="Add event"
          className={classes['new-event-form__submit']}
          onClick={() => {}}
        ></Button>
      </form>
    </Card>
  );
};

export default NewEvent;
