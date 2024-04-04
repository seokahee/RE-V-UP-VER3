import React, { forwardRef } from "react";

const ChangeFontColor = forwardRef<HTMLDivElement>((props, ref) => {
  const fontColorList: string[] = [
    "#ff0000",
    "#2f802f",
    "#0000ff",
    "#000000",
    "#ffffff",
  ];
  const fontColorNameList: string[] = [
    "Red",
    "Green",
    "Blue",
    "Black",
    "white",
  ];

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
          className={`btn my-5 p-1 border border-solid border-black rounded`}
          style={
            index === 4
              ? { color: "#a9a9a9" }
              : { color: `${fontColorList[index]}` }
          }
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
