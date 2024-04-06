import React, { ReactNode } from "react";

type Modal = {
  title: string;
  children: ReactNode;
  onClick: () => void;
};

const Modal = ({ title, children, onClick }: Modal) => {
  return (
    <div className="">
      <div className="fixed left-0 right-0 top-0 bottom-0 bg-black/[0.2]"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[80%] border border-solid border-slate-300 rounded-md bg-white">
        <div className="flex justify-between p-4 border-b border-solid border-slate-300">
          <h3>{title}</h3>
          <button type="button" onClick={onClick}>
            x
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
