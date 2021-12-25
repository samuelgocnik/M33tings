import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../../../hooks/use-input';
import { useAuth } from '../../../store/auth-context';
import Button from '../../UI/Button';
import LoadingDots from '../../UI/Loading/LoadingDots';
import classes from './AuthForm.module.css';

const ForgotPasswordForm = () => {
  const { passwordReset } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    wasTouched: emailWasTouched,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    (value) => value.trim().includes('@') && value.trim().includes('.')
  );

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!emailIsValid) {
      return setError('Fill up all inputs correctly');
    }

    try {
      setError('');
      setMessage('');
      setIsLoading(true);
      await passwordReset(emailValue);
      setMessage('Check your inbor for futher instructions');
    } catch (error) {
      setError('Failed to reset password');
    }

    setIsLoading(false);
  }

  const emailHasError = emailWasTouched && !emailIsValid;

  return (
    <section className={classes['auth-form']}>
      <h1 className={classes['auth-form__heading']}>Password Reset</h1>
      {error && <span className={classes['auth-form__error']}>{error}</span>}
      {message && (
        <span className={classes['auth-form__message']}>{message}</span>
      )}
      <form onSubmit={submitHandler}>
        <div
          className={`${classes['auth-form__input']} ${
            emailHasError && classes['auth-form__input--error']
          }`}
        >
          <label htmlFor="email">Your Email</label>
          <input
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="email"
            id="email"
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <Button
              text="Reset password"
              type="submit"
              className={classes['auth-form__submit']}
              onClick={() => {}}
            />
          )}
          {isLoading && <LoadingDots />}

          <div className={classes['auth-form__link']}>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ForgotPasswordForm;
