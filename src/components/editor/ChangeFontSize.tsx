import React, { forwardRef, useRef } from "react";

const ChangeFontSize = forwardRef<HTMLDivElement>((props, ref) => {
  const fontSizeSelectorRef = useRef<HTMLSelectElement>(null);

  const fontSizeList: number[] = [10, 12, 16, 18, 24, 32, 48];

  const changeFontSize = (size: number) => {
    if (fontSizeSelectorRef) {
      document.execCommand("fontSize", false, String(size));

      if (typeof ref !== "function") {
        if (ref && ref.current) {
          ref.current.focus({ preventScroll: true });
        }
      }
    }
  };

  return (
    <>
      <select
        id="select-font-size"
        ref={fontSizeSelectorRef}
        onChange={(event) => changeFontSize(parseInt(event.target.value))}
        className={`ml-5 mr-2 my-5 p-1 border border-solid border-black rounded`}
      >
        {fontSizeList.map((size, index) => (
          <option key={index} value={index+1}>
            {size}
          </option>
        ))}
      </select>
    </>
  );
});
ChangeFontSize.displayName = "ChangeFontSize";


export default ChangeFontSize;
