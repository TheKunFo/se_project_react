import "./Header.css";
import { useState } from "react";
import logo from "../../assets/logos.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
export default function Header({ setShowModal, city }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__left">
        <span className="header__logo">
          <img src={logo} alt="logo" width={100} height={50} />
        </span>
        <span className="header__location">
          {currentDate}, {city}{" "}
        </span>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button className="header__add-btn" onClick={() => setShowModal(true)}>
          + Add clothes
        </button>
        
        <div className="header__profile">
          <span>Terrence Tegegne</span>
          <img
            alt="Profile avatar"
            className="header__avatar"
            src="https://storage.googleapis.com/a1aa/image/a83da40a-5b97-4e09-64b6-cf7892ea912b.jpg"
            width="32"
            height="32"
            draggable="false"
          />
        </div>
        
      </div>
    </header>
  );
}
