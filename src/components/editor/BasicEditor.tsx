import { buttonStyle, initialButtonStyle } from "@/style/editorStyle";
import React, { useRef } from "react";

const BasicEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorValue = editorRef.current;
  const fontNameSelectorRef = useRef<HTMLSelectElement>(null);

  const applyStyle = (style: string): void => {
    if (editorValue) {
      document.execCommand(style);
      focusEditor();
    }
  };

  const changeFontName = (name: string) => {
    document.execCommand("fontName", false, name);
    focusEditor();
  };

  const focusEditor = () => {
    if (editorValue) {
      editorValue.focus({ preventScroll: true });
    }
  };

  const submitHandler = async () => {
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
