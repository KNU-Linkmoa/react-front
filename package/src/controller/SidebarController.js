import React, { useState } from "react";
import Main from "../views/main";
import Sidebar from "../layouts/Sidebar";

const SidebarController = () => {
  const [sidebarKey, setSidebarKey] = useState(0);

  const updateSidebar = () => {
    setSidebarKey((prevKey) => prevKey + 1);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar key={sidebarKey} />
      <Main updateSidebar={updateSidebar} />
    </div>
  );
};

export default SidebarController;
