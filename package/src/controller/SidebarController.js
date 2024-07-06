import React, { useState } from "react";
import Main from "../views/main";
import Sidebar from "../layouts/Sidebar";

const SidebarController = () => {
  const [updateSidebar, setUpdateSidebar] = useState(false);

  const toggleSidebarUpdate = () => {
    setUpdateSidebar((prevState) => !prevState);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar updateSidebar={updateSidebar} />
      <Main updateSidebar={toggleSidebarUpdate} />
    </div>
  );
};

export default SidebarController;
