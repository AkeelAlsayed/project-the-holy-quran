import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MenuButton = ({ onClick, isMenuOpen }) => {
  return (
    <button className="menuBtn" onClick={onClick}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default MenuButton;
