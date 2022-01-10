import React from 'react';
import classes from './Message.module.css';

const Message = (props: { value: string; type: 'success' | 'error' }) => {
  return (
    <div className={`${classes['message']} ${classes[props.type]}`}>
      <span>{props.value}</span>
    </div>
  );
};

export default Message;
