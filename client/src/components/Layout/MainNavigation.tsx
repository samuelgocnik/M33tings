import React, { useState } from "react";
import BEMHelper from "react-bem-helper";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-dispatch";
import { UiTypes } from "../../models/Ui";
import { authActions } from "../../store/auth-slice";
import { uiActions } from "../../store/ui-slice";
import Button from "../UI/Button";
import LoadingDots from "../UI/Loading/LoadingDots";
import DesktopLogo from "./../../assets/icons/m33tings-desktop.svg";
import "./MainNavigation.css";

const classes = new BEMHelper({
  name: "header",
});

const MainNavigation = () => {
  const { showNotification } = uiActions;
  const { logout } = authActions;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function logoutHandler() {
    try {
      setIsLoading(true);
      dispatch(logout());
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: "logout",
          message: "Successfully log out",
        })
      );
      setIsLoading(false);
      history.push("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <header {...classes()}>
      <Link to="/">
        <img {...classes("logo")} src={DesktopLogo} alt="main logo" />
      </Link>
      <nav>
        <ul {...classes("links")}>
          <li {...classes("item")}>
            <Link to="/meetings">Meetings</Link>
          </li>
          <li {...classes("item")}>
            <Link to="/profile">Profile</Link>
          </li>
          <li {...classes("item", "logout")}>
            {!isLoading && (
              <Button
                text={"Logout"}
                type="button"
                className=""
                onClick={logoutHandler}
                disabled={false}
              />
            )}
            {isLoading && <LoadingDots />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
