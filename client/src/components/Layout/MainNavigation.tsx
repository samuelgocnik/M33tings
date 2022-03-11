import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-dispatch";
import { UiTitles, UiTypes } from "../../models/Ui";
import { authActions } from "../../store/auth-slice";
import { uiActions } from "../../store/ui-slice";
import Button from "../UI/Button";
import LoadingDots from "../UI/Loading/LoadingDots";
import DesktopLogo from "./../../assets/icons/m33tings-desktop-stroke.svg";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { showNotification } = uiActions;
  const { logout } = authActions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [areMeetingsOpen, setAreMeetingsOpen] = useState<boolean>(false);

  async function logoutHandler() {
    try {
      setIsLoading(true);
      dispatch(logout());
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: UiTitles.SuccessfullyLoggedOut,
          message: "Successfully log out",
        })
      );
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <img
          className={classes["header__logo"]}
          src={DesktopLogo}
          alt="main logo"
        />
      </Link>
      <nav className={classes["header__links"]}>
        <NavLink
          to="/meetings"
          className={({ isActive }) =>
            isActive
              ? `${classes["header__item"]} ${classes["header__item--active"]}`
              : `${classes["header__item"]}`
          }
        >
          Meetings
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${classes["header__item"]} ${classes["header__item--active"]}`
              : `${classes["header__item"]}`
          }
        >
          Profile
        </NavLink>
        {!isLoading && (
          <Button
            text={"Logout"}
            type="button"
            className={`${classes["header__item"]} ${classes["header__item--logout"]}`}
            onClick={logoutHandler}
            disabled={false}
          />
        )}
        {isLoading && <LoadingDots />}
      </nav>
    </header>
  );
};

export default MainNavigation;
