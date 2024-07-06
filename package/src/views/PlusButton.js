// PlusButton.js
import React from "react";
import { Dropdown, DropdownToggle } from "reactstrap";
import plus from "./more.png";

const PlusButton = ({ toggle }) => {
  return (
    <div style={{ width: "200px" }}>
      <Dropdown isOpen={toggle} toggle={toggle}>
        <DropdownToggle color="transparent">
          <img src={plus} alt="add" width="60" />
        </DropdownToggle>
      </Dropdown>
    </div>
  );
};

export default PlusButton;
