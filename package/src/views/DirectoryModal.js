// DirectoryModal.js
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import directory from "./directory.png";

const DirectoryModal = ({
  isOpen,
  toggle,
  directoryName,
  setDirectoryName,
  handleAddDirectory,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>디렉토리 추가하기</ModalHeader>
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
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button color="primary" onClick={handleAddDirectory}>
          디렉토리 생성
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DirectoryModal;
