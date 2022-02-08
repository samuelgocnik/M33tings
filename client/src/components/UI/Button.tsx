import React from 'react';
import classes from './Button.module.css';

interface IButtonProps {
  text: string;
  className: string;
  type: "button" | "submit" | "reset";
  onClick: (() => void);
}

const Button = (props: IButtonProps) => {
  return (
    <button type={props.type} onClick={props.onClick} className={`${classes.button} ${props.className}`}>
      {props.text}
    </button>
  );
};

export default Button;
