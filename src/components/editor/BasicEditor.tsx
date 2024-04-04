import React, { useRef } from "react";
import ChangeFont from "./ChangeFont";
import ChangeFontSize from "./ChangeFontSize";

const BasicEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const editorValue = editorRef.current;

  const applyStyle = (style: string): void => {
    if (editorValue) {
      document.execCommand(style);

      if (editorValue) {
        editorValue.focus({ preventScroll: true });
      }
    }
  };

  const submitHandler = async () => {
    console.log(editorValue?.innerHTML);
  };

  const buttonStyle =
    "btn ml-2 mr-2 my-5 p-1 border border-solid border-black rounded";

  const initialButtonStyle =
    "btn ml-5 mr-2 my-5 p-1 border border-solid border-black rounded";

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
      <ChangeFont ref={editorRef} button={buttonStyle} />
      <ChangeFontSize ref={editorRef } />
      <div
        id="editor"
        ref={editorRef}
        contentEditable
        className={`mx-5 p-10 border border-black border-solid rounded min-h-32 [&>img]:w-full`}
      ></div>
      <button className={initialButtonStyle} onClick={submitHandler}>
        submit
      </button>{" "}
    </>
  );
};

export default BasicEditor;
