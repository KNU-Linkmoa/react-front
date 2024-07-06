import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import link from "./link.png";
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
import { AddLink } from "./AddLink.js";

const Directory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const token = localStorage.getItem("Accesstoken");
  const [modal, setModal] = useState(false);
  const [LinkName, setLinkName] = useState("");
  const [LinkUrl, setLinkUrl] = useState("");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const getList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dir/${id}/sites`, {
        headers: {
          Accesstoken: token,
        },
      });
      console.log(response.data.response);
      //console.log("서버 응답 데이터:", response.data.response); // 응답 데이터 콘솔 출력
      setList(response.data.response);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleDoubleClick = (url) => {
    window.location.href = `${url}`;
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAddLink = async () => {
    try {
      await AddLink(LinkName, LinkUrl, id);
      console.log("링크 생성 요청", LinkName, LinkUrl, id);
      toggleModal();
      getList();
      setLinkName("");
      setLinkName("");
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
            <DropdownItem onClick={toggleModal}>사이트추가</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Modal isOpen={modal} toggle={toggleModal} style={{ zIndex: 10 }}>
        <ModalHeader toggle={toggleModal}>링크 추가하기</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="d-flex justify-content-center">
              <img src={link} alt="link" width="80" />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <input
                className="form-control"
                placeholder="링크 이름"
                value={LinkName}
                onChange={(e) => setLinkName(e.target.value)}
              />
              <input
                className="form-control"
                placeholder="링크 주소"
                value={LinkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            취소
          </Button>
          <Button color="primary" onClick={handleAddLink}>
            링크 생성
          </Button>
        </ModalFooter>
      </Modal>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {list !== undefined &&
          list.map((site) => (
            <div style={{ margin: "10px", textAlign: "center" }}>
              <img
                src={link}
                alt="link"
                width="100"
                onDoubleClick={() => handleDoubleClick(site.siteUrl)}
                style={{ cursor: "pointer" }}
              />
              <div>{site.siteName}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Directory;
