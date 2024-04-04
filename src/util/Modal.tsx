import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
};

const Modal = ({ isOpen, children, closeModal }: ModalProps) => {
  return (
    <div
      className={`${isOpen ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}`}
    >
      <div className=" w-full h-full bg-black-400 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 max-w-[400px] w-full">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 w-[32px] h-[32px] bg-red-400 text-green-400 rounded-full flex items-center justify-center"
        >
          Close
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
