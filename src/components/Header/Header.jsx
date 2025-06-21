import "./Header.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function Header({
  setShowModal,
  city,
  handleToggleSwitchChange,
  showSignUp,
  setShowSignUp,
  showSignIn,
  setShowSignIn,
  isSubmitEnabled,
  setIsSubmitEnabled,
  isLoggedIn,
  setIsLoggedIn,
  setCurrentUser,
}) {

  const currentUser = useContext(CurrentUserContext)
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <span className="header__logo">
          <Link to="/" >
            <img src={logo} alt="logo" width={100} height={50} />
          </Link>
        </span>
        <span className="header__location">
          {currentDate}, {city}{" "}
        </span>
      </div>
      <div className="header__center">

        <ToggleSwitch
          handleToggleSwitchChange={handleToggleSwitchChange}
        />
      </div>
      <div className="header__right">
        {isLoggedIn ? (
          <button className="header__add-btn" onClick={() => setShowModal(true)}>
            + Add clothes
          </button>
        ) : null}

        <div className="header__profile">
          {isLoggedIn ? (
            <Link to="/profile" className="header__profile-link" >
              <span>{currentUser.name}</span>
              <img
                alt="Profile avatar"
                className="header__avatar"
                src={currentUser.avatar}
                width="32"
                height="32"
                draggable="false"
              />
            </Link>
          ) : (
            <>
              <button onClick={() => setShowSignUp(true)} >Sign Up</button>
              <button onClick={() => setShowSignIn(true)} >Log in</button>
            </>
          )
          }

        </div>

      </div>
      <SignUp
        showModal={showSignUp}
        setShowModal={setShowSignUp}
        isSubmitEnabled={isSubmitEnabled}
        setIsSubmitEnabled={setIsSubmitEnabled}
        setShowSignIn={setShowSignIn}
      />
      <SignIn
        showModal={showSignIn}
        setShowModal={setShowSignIn}
        isSubmitEnabled={isSubmitEnabled}
        setIsSubmitEnabled={setIsSubmitEnabled}
        setIsLoggedIn={setIsLoggedIn}
        setCurrentUser={setCurrentUser}
        setShowSignUp={setShowSignUp}
      />
    </header>
  );
}
