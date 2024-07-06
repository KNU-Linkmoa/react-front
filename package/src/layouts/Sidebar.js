import { Button, Nav, NavItem } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config.js";

const token = localStorage.getItem("Accesstoken");

const Sidebar = ({ updateSidebar }) => {
  const [directories, setDirectories] = useState([{ id: "all", name: "전체" }]);

  useEffect(() => {
    fetchDirectories();
  }, []);

  useEffect(() => {
    fetchDirectories();
  }, [updateSidebar]);

  const fetchDirectories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dir/me`, {
        headers: {
          Accesstoken: token,
        },
      });
      setDirectories([{ id: "all", name: "전체" }, ...response.data.response]);
    } catch (error) {
      console.error("Error fetching directories:", error);
    }
  };

  let location = useLocation();
  return (
    <div className="bg-white">
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {directories !== undefined &&
            directories.map((dir) => (
              <NavItem key={dir.id} className="sidenav-bg">
                <Link
                  to={dir.id === "all" ? `/` : `/dir/${dir.id}`}
                  className={
                    location.pathname ===
                    (dir.id === "all" ? `/` : `/dir/${dir.id}`)
                      ? "active nav-link py-3"
                      : "nav-link py-3"
                  }
                >
                  <i className={"bi bi-icon"}></i>
                  <span className="ms-3 d-inline-block">{dir.name}</span>
                </Link>
              </NavItem>
            ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
