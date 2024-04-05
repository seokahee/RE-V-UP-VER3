"use client";

import PersonalModal from "@/components/personal/PersonalModal";
import { useState, useEffect } from "react";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const HOME_VISITED = localStorage.getItem("homeVisited");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const today = new Date();
    const visitedDate = HOME_VISITED ? new Date(HOME_VISITED) : null;

    const handleMainPop = () => {
      if (visitedDate && visitedDate > today) {
        // 현재 date가 localStorage의 시간보다 크면 return
        return;
      }
      if (!visitedDate || visitedDate < today) {
        // 저장된 date가 없거나 today보다 작다면 popup 노출
        setIsModalOpen(true);
      }
    };
    window.setTimeout(handleMainPop, 1000); // 1초 뒤 실행
  }, [HOME_VISITED]);

  return (
    <div>
      <button onClick={openModal}>모달 테스트</button>
      <PersonalModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export default page;
