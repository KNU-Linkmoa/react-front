import React, { useState } from "react";
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
import plus from "./more.png";
import directory from "./directory.png";

const ButtonAndModal = ({ handleAddDirectory }) => {
  const [modal, setModal] = useState(false);
  const [directoryName, setDirectoryName] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div>
      <Dropdown isOpen={modal} toggle={toggleModal}>
        <DropdownToggle color="transparent">
          <img src={plus} alt="add" width="60" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={toggleModal}>디렉토리추가</DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
    </div>
  );
};

export default ButtonAndModal;
