import React, { useRef } from "react";
import ChangeFont from "./ChangeFont";
import ChangeFontSize from "./ChangeFontSize";

const BasicEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyStyle = (style: string): void => {
    if (editorRef.current) {
      document.execCommand(style);

      if (editorRef.current) {
        editorRef.current.focus({ preventScroll: true });
      }
    }
  };

  const submitHandler = async () => {
    console.log(editorRef.current?.innerHTML);
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
      <ChangeFont ref={editorRef} />
      <ChangeFontSize ref={editorRef} />
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
