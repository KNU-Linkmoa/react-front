import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import directory from "./directory.png";
import plus from "./more.png";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import AddRootDirectory from "./AddRootDirectory.js"; // Import the createDirectory function

const Main = ({ updateSidebar }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const token = localStorage.getItem("Accesstoken");
  const [modal, setModal] = useState(false);
  const [directoryName, setDirectoryName] = useState("");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const getList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dir/me`, {
        headers: {
          Accesstoken: token,
        },
      });
      console.log(response.data);
      console.log("서버 응답 데이터:", response.data.response); // 응답 데이터 콘솔 출력
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

  // Function to handle directory creation
  const handleAddDirectory = async () => {
    try {
      await AddRootDirectory(directoryName);
      console.log("디렉토리 생성 요청");
      toggleModal();
      getList(); // 디렉토리 생성 후 리스트 다시 가져오기
      setDirectoryName("");
      updateSidebar(); // 상위 컴포넌트로 콜백 호출하여 Sidebar 다시 렌더링 요청
    } catch (error) {
      console.error("디렉토리 생성 실패", error);
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
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img src={plus} alt="add" width="60" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={toggleModal}>디렉토리추가</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
              <div>{dir.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Main;
