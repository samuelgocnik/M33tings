import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useInput from '../../../hooks/use-input';
import { useAuth } from '../../../store/auth-context';
import Button from '../../UI/Button';
import LoadingDots from '../../UI/Loading/LoadingDots';
import classes from './AuthForm.module.css';

function LogIn() {
  const history = useHistory();
  const { logIn } = useAuth();
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

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    wasTouched: passwordWasTouched,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length > 5);

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      return setError('Fill up all inputs correctly');
    }

    try {
      setError('');
      setIsLoading(true);
      await logIn(emailValue, passwordValue);
      history.push('/meetings');
    } catch (error) {
      setError('Failed to log in');
    }
    setIsLoading(false);
  }

  const emailHasError = emailWasTouched && !emailIsValid;
  const passwordHasError = passwordWasTouched && !passwordIsValid;

  return (
    <section className={classes['auth-form']}>
      <h1 className={classes['auth-form__heading']}>Log In</h1>
      {error && <span className={classes['auth-form__error']}>{error}</span>}
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

        <div
          className={`${classes['auth-form__input']} ${
            passwordHasError && classes['auth-form__input--error']
          }`}
        >
          <label htmlFor="password">Your Password</label>
          <input
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
            id="password"
            required
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <Button
              text="Login"
              type="submit"
              className={classes['auth-form__submit']}
              onClick={() => {}}
            />
          )}
          {isLoading && <LoadingDots />}
          <div className={classes['auth-form__link']}>
            <Link to="/forgot-password">Forgot password</Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default LogIn;
