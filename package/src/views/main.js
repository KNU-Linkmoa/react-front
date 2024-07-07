import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import directory from "./directory.png";
import plus from "./more.png";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import AddRootDirectory from "./AddRootDirectory.js";
import "../css/style.css";

const Main = ({}) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const token = localStorage.getItem("Accesstoken");

  const [modal, setModal] = useState(false);
  const [directoryName, setDirectoryName] = useState("");
  const [viewStates, setViewStates] = useState({});
  const [inputValues, setInputValues] = useState({});

  // directory 리스트 얻기
  const getList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dir/me`, {
        headers: {
          Accesstoken: token,
        },
      });
      setList(response.data.response);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleDoubleClick = (id) => {
    navigate(`/dir/${id}`);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  // 첫 화면에서 디렉토리를 만드는 경우(root directory)
  const handleAddDirectory = async () => {
    try {
      await AddRootDirectory(directoryName);
      console.log("디렉토리 생성 요청");
      toggleModal();
      getList();
      setDirectoryName("");
    } catch (error) {
      console.error("디렉토리 생성 실패", error);
    }
  };

  const handleDirectoryMenuClick = (id) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    // Dropdown이 닫힐 때 변경된 값 저장 요청
    if (dropdownOpen[id] && inputValues[id]) {
      EditDirectoryName(id, inputValues[id]);
    }
  };

  const handleInputChange = (e, id) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };

  const clearInput = (id) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: "",
    }));
  };

  const handleDeleteDirectory = async (id) => {
    try {
      console.log("디렉토리 삭제 요청");
      getList();
    } catch (error) {
      console.error("디렉토리 삭제 실패", error);
    }
  };

  const EditDirectoryName = async (id, newName) => {
    try {
      await axios.put(
        `${API_BASE_URL}/dir/${id}`,
        { name: newName },
        {
          headers: {
            Accesstoken: token,
          },
        }
      );
      getList(); // 변경 후 리스트 다시 가져오기
      console.log("되고 있옹");
    } catch (error) {
      console.error("디렉토리 이름 변경 실패", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "inline-block",
          marginRight: "10px",
          verticalAlign: "top",
        }}
      >
        <UncontrolledDropdown
          isOpen={dropdownOpen.global}
          toggle={() =>
            setDropdownOpen({ ...dropdownOpen, global: !dropdownOpen.global })
          }
        >
          <DropdownToggle color="transparent">
            <img src={plus} alt="add" width="60" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={toggleModal}>디렉토리추가</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <Modal isOpen={modal} toggle={toggleModal} style={{ zIndex: 10 }}>
        <ModalHeader toggle={toggleModal}>디렉토리 추가하기</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="d-flex justify-content-center">
              <img src={directory} alt="directory" width="80" />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <input
                className="form-control"
                placeholder="디렉토리 이름"
                value={directoryName}
                onChange={(e) => setDirectoryName(e.target.value)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            취소
          </Button>
          <Button color="primary" onClick={handleAddDirectory}>
            디렉토리 생성
          </Button>
        </ModalFooter>
      </Modal>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {list !== undefined &&
          list.map((dir) => (
            <div
              key={dir.id}
              style={{
                margin: "10px",
                textAlign: "center",
                marginRight: "30px",
              }}
            >
              <img
                src={directory}
                alt="directory"
                width="100"
                onDoubleClick={() => handleDoubleClick(dir.id)}
                style={{ cursor: "pointer" }}
              />
              <div className="name-and-icon">
                <div className="truncated-text" style={{ color: "gray" }}>
                  {dir.name}
                </div>
                <UncontrolledDropdown
                  className="custom-dropdown"
                  isOpen={dropdownOpen[dir.id]}
                  toggle={() => handleDirectoryMenuClick(dir.id)}
                >
                  <DropdownToggle
                    tag="i"
                    className={`bi bi-caret-down-fill small custom-dropdown-toggle`}
                    style={{ color: "gray" }}
                  ></DropdownToggle>
                  <DropdownMenu className="custom-dropdown-menu">
                    <div className="input_container">
                      <input
                        type="text"
                        value={
                          inputValues[dir.id] !== undefined
                            ? inputValues[dir.id]
                            : dir.name
                        }
                        onChange={(e) => handleInputChange(e, dir.id)}
                        style={{ flex: "1", marginRight: "10px", width: "90%" }}
                      />
                      <button
                        onClick={() => clearInput(dir.id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <i className="bi bi-x-circle-fill small"></i>
                      </button>
                    </div>
                    <DropdownItem className="custom-dropdown-item">
                      <i
                        className="bi bi-share"
                        style={{ marginRight: "10px" }}
                      ></i>{" "}
                      공유하기
                    </DropdownItem>
                    <div className="custom-dropdown-divider"></div>
                    <DropdownItem
                      className="custom-dropdown-item"
                      style={{ color: "red" }}
                      onClick={() => handleDeleteDirectory(dir.id)}
                    >
                      <i
                        className="bi bi-trash3"
                        style={{ marginRight: "10px", color: "red" }}
                      ></i>
                      삭제하기
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Main;
