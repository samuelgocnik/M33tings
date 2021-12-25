import React from 'react';
import classes from './Button.module.css';

const Button = (props: {
  text: string;
  className: string;
  type: "button" | "submit" | "reset";
  onClick: () => void;
}) => {
  return (
    <button type={props.type} onClick={props.onClick} className={`${classes.button} ${props.className}`}>
      {props.text}
    </button>
  );
};

export default Button;
