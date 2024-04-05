import Link from "next/link";

const PersonalModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const closeTodayPop = () => {
    let expires = new Date();
    expires.setHours(expires.getHours() + 24);
    localStorage.setItem("homeVisited", expires.getTime().toString());
    // 현재 시간의 24시간 뒤의 시간을 homeVisited에 저장
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed z-10 bg-white p-8 rounded-lg">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <Link href="/personal-music">
          <p>테스트 하러가기</p>
        </Link>
        <p onClick={closeTodayPop}>오늘은 그만보기</p>
      </div>
    </div>
  );
};

export default PersonalModal;
