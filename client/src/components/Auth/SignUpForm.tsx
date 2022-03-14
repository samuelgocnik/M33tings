import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/use-dispatch";
import Button from "../UI/Button";
import LoadingDots from "../UI/Loading/LoadingDots";
import classes from "./AuthForm.module.css";
import Message from "../UI/Messages/Message";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import { uiActions } from "../../store/ui-slice";
import { UiTypes } from "../../models/Ui";
import { registerUser } from "../../store/auth-actions";
import { useAppSelector } from "../../hooks/use-selector";

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const { showNotification, setNoneNotification } = uiActions;
  const notification = useAppSelector((state) => state.ui.notification);

  const nameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const passwordConfirmationInputRef = useRef<HTMLInputElement>();

  // on mount and unmount restore notification
  useEffect(() => {
    dispatch(setNoneNotification());

    return () => {
      dispatch(setNoneNotification());
    };
  }, [dispatch, setNoneNotification]);

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    const name = nameInputRef.current?.value.trim() || "";
    const password = passwordInputRef.current?.value.trim() || "";

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
    if (password !== passwordConfirmationInputRef.current?.value) {
      dispatch(
        showNotification({
          type: UiTypes.Error,
          title: "Error",
          message: "Passwords do not match",
        })
      );
      return;
    }
    dispatch(registerUser(name, password));
  }

  return (
    <Card className={classes["auth-form"]}>
      <h1 className={classes["auth-form__heading"]}>Sign Up</h1>

      <Message type={notification.type} value={notification.message} />

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
          <Button
            text="Create Account"
            type="submit"
            className={classes["auth-form__submit"]}
            onClick={() => {}}
            disabled={notification.type === UiTypes.Loading}
          />
          {notification.type === UiTypes.Loading && <LoadingDots />}
        </div>
      </form>
    </Card>
  );
};

export default SignUpForm;
