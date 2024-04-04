"use client";

import { useState } from "react";
import ModalPotal from "@/components/personalModal/ModalPotal";
import PersnalDetail from "@/components/personalModal/PersnalDetail";
import PersnalModal from "@/components/personalModal/PersnalModal";

const PersonalMusic = () => {
  const [OpenModal, setOpenModal] = useState(false);

  const onTestHandler = () => {
    //버튼 클릭 시 모달 오픈
    setOpenModal(true);
  };

  return (
    <div>
      PersonalMusic
      <button onClick={onTestHandler}>테스트</button>
      {OpenModal && (
        <ModalPotal>
          <div>
            <PersnalModal onClose={() => setOpenModal(false)}>
              <PersnalDetail />
            </PersnalModal>
          </div>
        </ModalPotal>
      )}
    </div>
  );
};

export default PersonalMusic;
