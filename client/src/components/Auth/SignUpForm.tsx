import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { messageActions } from '../../store/message-slice';
import Button from '../UI/Button';
import LoadingDots from '../UI/Loading/LoadingDots';
import classes from './AuthForm.module.css';
import API_URL from '../../utils/config';
import Message from '../UI/Messages/Message';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';

function SignUpForm() {
  const history = useHistory();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const nameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const passwordConfirmationInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    dispatch(messageActions.setSuccessfulRegistration({ value: false }));
    return () => {};
  }, [dispatch]);

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    const name = nameInputRef.current?.value.trim() || '';
    const password = passwordInputRef.current?.value.trim() || '';

    if (name.length < 4 || name.length > 32) {
      return setError('Enter a valid name');
    }
    if (password.length < 6) {
      return setError('Enter a valid password');
    }
    if (password !== passwordConfirmationInputRef.current?.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setIsLoading(true);
      await Axios.post(`${API_URL}register`, {
        username: name,
        pwd: password,
      }).then((res) => {
        if (res.data.message) {
          throw new Error(res.data.message);
        }
      });
      dispatch(messageActions.setSuccessfulRegistration({ value: true }));
      history.push('/login');
    } catch (error) {
      setError('Failed to sign up: ' + error);
    }
    setIsLoading(false);
  }

  return (
    <Card className={classes['auth-form']}>
      <h1 className={classes['auth-form__heading']}>Sign Up</h1>
      {error && <Message type="error" value={error} />}
      <form onSubmit={submitHandler}>
        <Input
          ref={nameInputRef}
          id="name"
          label="Your nickname"
          type="text"
          error_message="Enter a valid nickname (4-32 chars long)"
          validate={(value: string): boolean =>
            value.trim().length > 3 && value.trim().length < 33
          }
        />

        <Input
          ref={passwordInputRef}
          id="password"
          label="Your password"
          type="password"
          error_message="Enter a valid password (at least 6 chars long)"
          validate={(value: string): boolean => value.trim().length > 5}
        />

        <Input
          ref={passwordConfirmationInputRef}
          id="passwordConfirm"
          label="Confirm your password"
          type="password"
          error_message="Enter a valid password (at least 6 chars long)"
          validate={(value: string): boolean => value.trim().length > 5}
        />

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
    </Card>
  );
}

export default SignUpForm;
