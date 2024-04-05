import { useState } from "react";
import SearchModal from "./SearchModal";

const MusicSearchModal = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const onModalOpenHandler = () => {
    setIsModal(true);
  };

  return (
    <div>
      <button onClick={onModalOpenHandler}>검색</button>
      {isModal && (
        <div>
          <SearchModal isModal={isModal} setIsModal={setIsModal} />
        </div>
      )}
    </div>
  );
};

export default MusicSearchModal;
