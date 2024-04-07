import { useState } from "react";
import MusicSearchModal from "./MusicSearchModal";

const MusicSearch = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const onModalOpenHandler = () => {
    setIsModal(true);
  };

  return (
    <div>
      <button onClick={onModalOpenHandler}>검색</button>
      {isModal && (
        <div>
          <MusicSearchModal isModal={isModal} setIsModal={setIsModal} />
        </div>
      )}
    </div>
  );
};

export default MusicSearch;
