import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import link from "./link.png";
import plus from "./more.png";
import {
  UncontrolledDropdown,
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

  const [inputValues, setInputValues] = useState({});

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
  }, [id]);

  const handleDoubleClick = (url) => {
    window.location.href = `${url}`;
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAddLink = async () => {
    try {
      await AddLink(LinkName, LinkUrl, id);
      toggleModal();
      getList();
      setLinkName("");
      setLinkName("");
    } catch (error) {
      console.error("디렉토리 생성 실패", error);
    }
  };

  const handleSiteMenuClick = (id) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    // Dropdown이 닫힐 때 변경된 값 저장 요청
    if (dropdownOpen[id] && inputValues[id]) {
      EditSiteName(id, inputValues[id]);
    }
  };

  const EditSiteName = async (id, newName) => {
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
      console.error("사이트 이름 변경 실패", error);
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

  const handleDeleteSite = async (id) => {
    try {
      console.log("site 삭제 요청");
      getList();
    } catch (error) {
      console.error("site 삭제 실패", error);
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
              <div className="name-and-icon">
                <div className="truncated-text" style={{ color: "gray" }}>
                  {site.siteName}
                </div>
                <UncontrolledDropdown
                  className="custom-dropdown"
                  isOpen={dropdownOpen[site.id]}
                  toggle={() => handleSiteMenuClick(site.id)}
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
                          inputValues[site.id] !== undefined
                            ? inputValues[site.id]
                            : site.siteName
                        }
                        onChange={(e) => handleInputChange(e, site.id)}
                        style={{ flex: "1", marginRight: "10px", width: "90%" }}
                      />
                      <button
                        onClick={() => clearInput(site.id)}
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
                      onClick={() => handleDeleteSite(site.id)}
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

export default Directory;
