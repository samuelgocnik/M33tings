import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/use-dispatch";
import { useAppSelector } from "../../hooks/use-selector";
import { UiTypes } from "../../models/Ui";
import { loginUser } from "../../store/auth-actions";
import { messageActions } from "../../store/message-slice";
import { uiActions } from "../../store/ui-slice";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import LoadingDots from "../UI/Loading/LoadingDots";
import Message from "../UI/Messages/Message";
import classes from "./AuthForm.module.css";

function LogIn() {
  const dispatch = useAppDispatch();

  const { showNotification, setNoneNotification } = uiActions;
  const notification = useAppSelector((state) => state.ui.notification);

  const nameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (notification.type === UiTypes.Error) {
      setNoneNotification();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setNoneNotification());
    }, 8000);
    return () => clearTimeout(timer);
  }, [dispatch, setNoneNotification, notification]);

  //submit login form
  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    dispatch(messageActions.setSuccessfulLogout({ value: false }));

    const name: string = nameInputRef.current?.value.trim() || "";
    const password: string = passwordInputRef.current?.value.trim() || "";

    if (name.length < 4 || name.length > 32) {
      dispatch(
        showNotification({
          type: UiTypes.Error,
          title: "Error",
          message: "Enter a valid name",
        })
      );
      return;
    }
    if (password.length < 6) {
      dispatch(
        showNotification({
          type: UiTypes.Error,
          title: "Error",
          message: "Enter a valid password",
        })
      );
      return;
    }
    dispatch(loginUser(name, password));
  }

  return (
    <Card className={classes["auth-form"]}>
      <h1 className={classes["auth-form__heading"]}>Log In</h1>
      {notification.type === UiTypes.Error && (
        <Message type="error" value={notification.message} />
      )}
      {notification.type === UiTypes.Success && (
        <Message type="success" value={notification.message} />
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
          {notification.type !== UiTypes.Loading && (
            <Button
              text="Login"
              type="submit"
              className={classes["auth-form__submit"]}
              onClick={() => {}}
            />
          )}
          {notification.type === UiTypes.Loading && <LoadingDots />}
        </div>
      </form>
    </Card>
  );
}

export default LogIn;
