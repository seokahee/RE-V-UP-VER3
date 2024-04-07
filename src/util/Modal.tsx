import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
};

const Modal = ({ isOpen, children, closeModal }: ModalProps) => {
  return (
    //모달
    <section
      className={`${isOpen ? "relative top-0 left-0 flex justify-center items-center max-w-[400px] z-50 " : "hidden"}`}
    >
      {isOpen && (
        <>
          <div
            onClick={closeModal}
            className="fixed top-0 left-0 w-full h-full opacity-50 z-40"
          ></div>
          <div className="bg-white rounded-lg p-8 max-w-[400px] relative z-50">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 p-5 w-full h-[60px] text-black flex justify-center"
            >
              <p className="flex w-full h-[10px] font-bold">X</p>
            </button>
            <div className="mt-4 rounded-[30px] bg-white w-3/5 h-4/5 max-w-7xl p-5 border-solid border-2 border-white">
              {children}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Modal;
