import React, { useRef } from "react";

const BasicEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyStyle = (style: string): void => {
    if (editorRef.current) {
      document.execCommand(style);
      focusEditor();
    }
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus({ preventScroll: true });
    }
  };

  const buttonStyle = "btn mx-2 my-5 p-1 border border-solid border-black rounded";

  return (
    <>
      <button className={buttonStyle} onClick={() => applyStyle('bold')}>B</button>
      <button className={buttonStyle} onClick={() => applyStyle('italic')}>I</button>
      <button className={buttonStyle} onClick={() => applyStyle('underline')}>U</button>
      <button className={buttonStyle} onClick={() => applyStyle('strikeThrough')}>S</button>
      <button className={buttonStyle} onClick={() => applyStyle('insertOrderedList')}>OL</button>
      <button className={buttonStyle} onClick={() => applyStyle('insertUnorderedList')}>UL</button>
      <div
        id="editor"
        ref={editorRef}
        contentEditable={true}
        className="mx-5 p-10 border border-black border-solid rounded min-h-32 *:w-full"
      ></div>
    </>
  );
};

export default BasicEditor;
