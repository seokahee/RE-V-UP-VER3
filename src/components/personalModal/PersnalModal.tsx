type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const PersnalModal = ({ onClose, children }: Props) => {
  return (
    <section
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-neutral-900/70 z-50"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-5 text-white"
        onClick={() => onClose()}
      >
        삭제
      </button>
      {/* 모달창 크기 */}
      <div className="content-center rounded-[30px] bg-white w-1/3 h-4/5 max-w-7xl p-8 border-solid border-2 border-subColor1">
        {children}
      </div>
    </section>
  );
};

export default PersnalModal;
