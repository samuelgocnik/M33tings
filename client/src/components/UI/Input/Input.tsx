import React from 'react';
import useInput from '../../../hooks/use-input';
import './Input.css';

export interface IInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  error_message: string;
  validate: (data: string) => boolean | null;
}

const Input = React.forwardRef((props: IInputProps, ref: any) => {
  const {
    value: enteredInput,
    isValid: inputIsValid,
    wasTouched: inputWasTouched,
    inputChangeHandler,
    inputBlurHandler,
  } = useInput(props.validate);

  return (
    <div
      className={`${'form-control'} ${
        !inputIsValid && inputWasTouched ? 'invalid' : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={ref}
        id={props.id}
        type={props.type}
        value={enteredInput}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
      />
      {!inputIsValid && inputWasTouched && (
        <p className="error-text">{props.error_message}</p>
      )}
    </div>
  );
});

export default Input;
