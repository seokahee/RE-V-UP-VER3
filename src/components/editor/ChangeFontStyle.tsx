import React, { forwardRef } from "react";

const ChangeFontStyle = forwardRef<HTMLDivElement>((props, ref) => {
  const applyStyle = (style: string): void => {
    if (typeof ref !== "function") {
      if (ref && ref.current) {
        document.execCommand(style);
        ref.current.focus({ preventScroll: true });
      }
    }
  };

  const buttonStyle =
    "btn ml-2 mr-2 my-5 p-1 border border-solid border-black rounded";

  return (
    <>
      <button className={buttonStyle} onClick={() => applyStyle("bold")}>
        B
      </button>
      <button className={buttonStyle} onClick={() => applyStyle("italic")}>
        I
      </button>
      <button className={buttonStyle} onClick={() => applyStyle("underline")}>
        U
      </button>
      <button
        className={buttonStyle}
        onClick={() => applyStyle("strikeThrough")}
      >
        S
      </button>
      <button
        className={buttonStyle}
        onClick={() => applyStyle("insertOrderedList")}
      >
        OL
      </button>
      <button
        className={buttonStyle}
        onClick={() => applyStyle("insertUnorderedList")}
      >
        UL
      </button>
    </>
  );
});

ChangeFontStyle.displayName = "ChangeFontStyle";

export default ChangeFontStyle;
