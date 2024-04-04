import React, { forwardRef } from "react";

const ChangeFontColor = forwardRef<HTMLDivElement>((props, ref) => {
  const fontColorList: string[] = ["#ff0000", "#00ff00", "#0000ff", "#000000"];
  const fontColorNameList: string[] = ["Red", "Green", "Blue", "Black"];

  const applyColor = (color: string): void => {
    if (typeof ref !== "function") {
      if (ref && ref.current) {
        document.execCommand("foreColor", false, color);
        ref.current.focus({ preventScroll: true });
      }
    }
  };

  return (
    <>
      {fontColorList.map((value, index) => (
        <button
          key={index}
          className={`btn my-5 p-1 border border-solid border-black rounded text-[${fontColorList[index]}]`}
          onClick={() => applyColor(fontColorList[index])}
        >
        {fontColorNameList[index]}
        </button>
      ))}
    </>
  );
});

ChangeFontColor.displayName = "ChangeFontColor";

export default ChangeFontColor;
