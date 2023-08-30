import { Modal } from "antd";
import React from "react";

export default function ModalComponent({
  children,
  isModalOpen,
  title = "Modal",
  ...rest
}) {
  return (
    <Modal title={title} open={isModalOpen} {...rest}>
      {children}
    </Modal>
  );
}
