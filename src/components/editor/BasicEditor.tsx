import { buttonStyle, initialButtonStyle } from "@/style/editorStyle";
import React, { useEffect, useRef } from "react";

const BasicEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorValue = editorRef.current;

  const applyStyle = (style: string): void => {
    if (editorValue) {
      document.execCommand(style);
      focusEditor();
    }
  };

  const focusEditor = () => {
    if (editorValue) {
      editorValue.focus({ preventScroll: true });
    }
  };

  const submitHandler = () => {
    console.log(editorValue?.innerHTML);
  };

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
