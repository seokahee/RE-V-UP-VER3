import React, { forwardRef } from "react";

const ChangeFontBackground = forwardRef<HTMLDivElement>((props, ref) => {
  const backgroundColorList: string[] = ["#ff0000", "#2f802f", "#0000ff", "#000000"];
  const backgroundColorNameList: string[] = ["Red", "Green", "Blue", "Black"];

  const applyColor = (color: string): void => {
    if (typeof ref !== "function") {
      if (ref && ref.current) {
        document.execCommand("hiliteColor", false, color);
        ref.current.focus({ preventScroll: true });
      }
    }
  };
  
  return (
    <>
      {backgroundColorList.map((value, index) => (
        <button
          key={index}
          className={`btn my-5 p-1 border border-solid border-black rounded text-white`}
          style = {{backgroundColor : `${backgroundColorList[index]}`}}
          onClick={() => applyColor(backgroundColorList[index])}
        >
        {backgroundColorNameList[index]}
        </button>
      ))}
    </>
  );
});

ChangeFontBackground.displayName = "ChangeFontBackground";

export default ChangeFontBackground;
