import Axios from 'axios';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { useAppSelector } from '../../hooks/use-selector';
import { IUser } from '../../models/User';
import { authActions } from '../../store/auth-slice';
import { messageActions } from '../../store/message-slice';
import API_URL from '../../utils/config';
import Button from '../UI/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import LoadingDots from '../UI/Loading/LoadingDots';
import Message from '../UI/Messages/Message';
import classes from './AuthForm.module.css';

function LogIn() {
  const history = useHistory();
  const { login } = authActions;
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const nameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const successfulRegistration: boolean = useAppSelector(
    (state) => state.message.successfulRegistration
  );

  const successfulLogout: boolean = useAppSelector(
    (state) => state.message.successfulLogout
  );

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    dispatch(messageActions.setSuccessfulLogout({ value: false }));

    const name: string = nameInputRef.current?.value.trim() || '';
    const password: string = passwordInputRef.current?.value.trim() || '';

    if (name.length < 4 || name.length > 32) {
      return setError('Enter a valid name');
    }
    if (password.length < 6) {
      return setError('Enter a valid password');
    }

    try {
      setError('');
      setIsLoading(true);
      await Axios.post(`${API_URL}login`, {
        username: name,
        pwd: password,
      }).then(
        (res: {
          data: {
            auth: boolean;
            token: string | null;
            message: string | null;
            result: IUser | null;
          };
        }) => {
          if (!res.data.auth && res.data.message) {
            throw new Error(res.data.message);
          }
          localStorage.setItem('token', res.data.token || 'Invalid token');
          dispatch(login({ user: res.data.result }));
        }
      );
      history.push('/meetings');
    } catch (error) {
      setError('Failed to log in: ' + error);
    }
    setIsLoading(false);
  }

  return (
    <Card className={classes['auth-form']}>
      <h1 className={classes['auth-form__heading']}>Log In</h1>
      {error && <Message type="error" value={error} />}
      {successfulLogout && (
        <Message type="success" value="Successfully log out" />
      )}
      {successfulRegistration && (
        <Message type="success" value="Successfully registered" />
      )}
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

        <div className={classes.actions}>
          {!isLoading && (
            <Button
              text="Login"
              type="submit"
              className={classes['auth-form__submit']}
              onClick={() => { }}
            />
          )}
          {isLoading && <LoadingDots />}
        </div>
      </form>
    </Card>
  );
}

export default LogIn;
