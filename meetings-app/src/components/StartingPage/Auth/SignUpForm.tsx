import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useInput from '../../../hooks/use-input';
import { useAuth } from '../../../store/auth-context';
import Button from '../../UI/Button';
import LoadingDots from '../../UI/Loading/LoadingDots';
import classes from './AuthForm.module.css';

function SignUpForm() {
  const history = useHistory();
  const { signUp } = useAuth();
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

  const {
    value: passwordConfirmationValue,
    isValid: passwordConfirmationIsValid,
    wasTouched: passwordConfirmationWasTouched,
    inputChangeHandler: passwordConfirmationChangeHandler,
    inputBlurHandler: passwordConfirmationBlurHandler,
  } = useInput((value) => value.trim().length > 5);

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!emailIsValid || !passwordIsValid || !passwordConfirmationIsValid) {
      return setError('Fill up all inputs correctly');
    }

    if (passwordValue !== passwordConfirmationValue) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setIsLoading(true);
      await signUp(emailValue, passwordValue);
      history.push('/meetings');
    } catch (error) {
      setError('Failed to create an account');
    }
    setIsLoading(false);
  }

  const emailHasError = emailWasTouched && !emailIsValid;
  const passwordHasError = passwordWasTouched && !passwordIsValid;
  const passwordConfirmationHasError =
    passwordConfirmationWasTouched && !passwordConfirmationIsValid;

  return (
    <section className={classes['auth-form']}>
      <h1 className={classes['auth-form__heading']}>Sign Up</h1>
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

        <div
          className={`${classes['auth-form__input']} ${
            passwordConfirmationHasError && classes['auth-form__input--error']
          }`}
        >
          <label htmlFor="passwordconfirmation">
            Your password confirmation
          </label>
          <input
            value={passwordConfirmationValue}
            onChange={passwordConfirmationChangeHandler}
            onBlur={passwordConfirmationBlurHandler}
            type="password"
            id="passwordconfirmation"
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <Button
              text="Create Account"
              type="submit"
              className={classes['auth-form__submit']}
              onClick={() => {}}
            />
          )}
          {isLoading && <LoadingDots />}
        </div>
      </form>
    </section>
  );
}

export default SignUpForm;
