import React, { useRef } from "react";

const ChangeFontSize = () => {
  const fontSizeSelectorRef = useRef<HTMLSelectElement>(null);

  const fontSizeList: number[] = [10, 12, 16, 18, 24, 32, 48];

  const changeFontSize = (size: number) => {
    if (fontSizeSelectorRef) {
      document.execCommand("fontSize", false, size.toString());

      if (editorValue) {
        editorValue.focus({ preventScroll: true });
      }
    }
  };

  return (
    <>
      <select
        id="select-font-size"
        ref={fontSizeSelectorRef}
        onChange={(e) => changeFontSize(parseInt(e.target.value))}
        className={`ml-5 mr-2 my-5 p-1 border border-solid border-black rounded`}
      >
        {fontSizeList.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
    </>
  );
};

export default ChangeFontSize;
