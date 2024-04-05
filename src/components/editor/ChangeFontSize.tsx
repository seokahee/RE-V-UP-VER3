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
    <div className="flex flex-row items-center space-x-1 my-3">
      <p>Font size: </p>
      <select
        id="select-font-size"
        ref={fontSizeSelectorRef}
        onChange={(event) => changeFontSize(parseInt(event.target.value))}
        className="border border-solid border-black rounded"
      >
        {fontSizeList.map((size, index) => (
          <option key={index} value={index + 1}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
});
ChangeFontSize.displayName = "ChangeFontSize";

export default ChangeFontSize;
