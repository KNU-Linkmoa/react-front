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

const Main = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const token = localStorage.getItem("Accesstoken");
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const [directoryName, setDirectoryName] = useState("");

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    console.log("List state updated:", list);
  }, [list]);
  const getList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dir/me`, {
        headers: {
          Accesstoken: token,
        },
      });
      setList(Array.isArray(response.data) ? response.data : []);
      console.log("get 요청");
      console.log(response.data);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleDoubleClick = (id) => {
    navigate(`/dir/${id}`);
  };
  const handleAddDirectory = async () => {
    try {
      const newDirectory = { id: list.length, name: directoryName };
      const directoryId = newDirectory.id;
      console.log(token);
      setList([...list, newDirectory]);
      setDirectoryName("");
      toggleModal();
      
      const response = await axios.post(
        `${API_BASE_URL}/dir/${directoryId}`,
        {
          directoryName: newDirectory.name,
        },
        {
          headers: {
            Accesstoken: token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("보냈음 ");
      }
    } catch (error) {
      console.error("Error adding directory:", error);
    }
  };
  const clickModal = () => {
    console.log("Modal clicked");
    return (
      <Modal isOpen={modal} toggle={toggleModal}>
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
    );
  };
  const handleAddLink = () => {};

  return (
    <div>
      <div style={{ width: "200px" }}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            {/* 아이콘 크기 조정 */}
            <img src={plus} alt="add" width="60" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={toggleModal}>디렉토리추가</DropdownItem>
            <DropdownItem onClick={handleAddLink}>링크추가</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {clickModal()}
      </div>

      {list.map((dir) => (
        <div
          key={dir.id}
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <img
            src={directory}
            alt="directory"
            width="80"
            onDoubleClick={() => handleDoubleClick(dir.id)}
            style={{ cursor: "pointer" }}
          />
          <div>{dir.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Main;
