import React, { useEffect, useRef, useState } from "react";

const BasicEditor = () => {
  const [fontName, setFontName] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const editorRef = useRef<HTMLDivElement>(null);
  const editorValue = editorRef.current;
  const fontNameSelectorRef = useRef<HTMLSelectElement>(null);
  const fontSizeSelectorRef = useRef<HTMLSelectElement>(null);

  editorValue;
  const fontSizeList: number[] = [10, 13, 16, 18, 24, 32, 48];

  const applyStyle = (style: string): void => {
    if (editorValue) {
      document.execCommand(style);
      focusEditor();
    }
  };

  useEffect(() => {
    checkStyle();
  }, [editorContent]);

  const checkStyle = () => {
    const containerElement = document.activeElement;
    if (containerElement) {
      const computedStyle = window.getComputedStyle(containerElement);
      const name = computedStyle.getPropertyValue("font-family");
      setFontName(name);
    }
  };

  const changeFontName = (name: string) => {
    if (fontNameSelectorRef) {
      document.execCommand("fontName", false, name);
      focusEditor();
    }
  };

  const changeFontSize = (size: number) => {
    if (fontSizeSelectorRef) {
      document.execCommand("fontSize", false, size.toString());
      focusEditor();
    }
  };

  const focusEditor = () => {
    if (editorValue) {
      editorValue.focus({ preventScroll: true });
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
      <select
        id="select-font"
        ref={fontNameSelectorRef}
        value={fontName}
        onChange={(e) => changeFontName(e.target.value)}
        className={`ml-5 mr-2 my-5 p-1 border border-solid border-black rounded`}
      >
        <option value="Inherit">Inherit(default)</option>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
      <select
        id="select-font-size"
        ref={fontSizeSelectorRef}
        onChange={(e) => changeFontSize(parseInt(e.target.value))}
      >
        {fontSizeList.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
      <div
        id="editor"
        ref={editorRef}
        contentEditable
        className={`mx-5 p-10 border border-black border-solid rounded min-h-32 [&>img]:w-full`}
        onInput={(event) => setEditorContent(event.currentTarget.innerHTML)}
      ></div>
      <button className={initialButtonStyle} onClick={submitHandler}>
        submit
      </button>{" "}
    </>
  );
};

export default BasicEditor;
