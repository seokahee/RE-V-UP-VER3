import React, { useRef } from "react";

const ImageInput = () => {
  const imageSelectorRef = useRef<HTMLInputElement>(null);

  const imageButtonClickHandler = () => {
    if (imageSelectorRef.current) {
      imageSelectorRef.current.click();
    }
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      insertImageData(file);
    }
  };

  const insertImageData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      document.execCommand("insertImage", false, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <button
        className="w-[50px] h-[30px] border border-solid border-black rounded"
        onClick={imageButtonClickHandler}
      >
        IMG
      </button>
      <input
        type="file"
        className="hidden"
        ref={imageSelectorRef}
        onChange={imageChangeHandler}
      />
    </>
  );
};

export default ImageInput;
