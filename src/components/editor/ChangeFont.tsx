import React, { forwardRef, useRef } from "react";

const ChangeFont = forwardRef<HTMLDivElement>((props, ref) => {
  const fontNameSelectorRef = useRef<HTMLSelectElement>(null);

  const changeFontName = (name: string) => {
    if (fontNameSelectorRef) {
      document.execCommand("fontName", false, name);

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
        id="select-font"
        ref={fontNameSelectorRef}
        onChange={(e) => changeFontName(e.target.value)}
        className={`ml-5 mr-2 my-5 p-1 border border-solid border-black rounded`}
      >
        <option value="Inherit">Inherit(default)</option>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
    </>
  );
});

ChangeFont.displayName = "ChangeFont";

export default ChangeFont;
