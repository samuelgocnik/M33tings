import React, { Fragment, useRef } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input/Input';

const NewEvent = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);

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
          error_message='Enter a valid event name (at least 4 chars long)'
          validate={(data: string): boolean => data.trim().length > 4}
        />
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
