import { Button, Nav, NavItem } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import "../css/style.css"; // 스타일 파일 import

const token = localStorage.getItem("Accesstoken");

const Sidebar = ({}) => {
  const [directories, setDirectories] = useState([{ id: "all", name: "전체" }]);
  const [hoveredIcon, setHoveredIcon] = useState(null); // hover 상태를 저장할 state

  useEffect(() => {
    fetchDirectories();
  }, []);

  useEffect(() => {
    fetchDirectories();
  }, []);

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

  const handleMouseEnter = (dirId) => {
    setHoveredIcon(dirId);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <div className="bg-white">
      <div className="p-2 mt-2">
        <Nav vertical className="sidebarNav">
          {directories !== undefined &&
            directories.map((dir) => (
              <NavItem
                key={dir.id}
                className="sidenav-bg"
                onMouseEnter={() => handleMouseEnter(dir.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={dir.id === "all" ? `/` : `/dir/${dir.id}`}
                  className={
                    location.pathname ===
                    (dir.id === "all" ? `/` : `/dir/${dir.id}`)
                      ? "active nav-link py-2"
                      : "nav-link py-2"
                  }
                >
                  <i
                    className={`bi ${
                      hoveredIcon === dir.id ? "bi-folder-symlink" : "bi-folder"
                    }`}
                    style={{ color: "grey" }}
                  ></i>
                  <span
                    className="ms-2 d-inline-block truncated-text_sidebar"
                    style={{ color: "grey" }}
                  >
                    {dir.name}
                  </span>
                </Link>
              </NavItem>
            ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
