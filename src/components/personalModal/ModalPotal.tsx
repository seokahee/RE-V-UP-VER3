import ReactDOM from "react-dom";

const ModalPotal = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === "undefined") {
    return null;
  }
  const node = document.getElementById("portal") as Element;
  return ReactDOM.createPortal(children, node);
};

export default ModalPotal;
