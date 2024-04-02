import React, { useRef } from "react";

const BasicEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const setStyle = (style: string): void => {
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
      <button className={buttonStyle} onClick={() => setStyle('bold')}>B</button>
      <button className={buttonStyle} onClick={() => setStyle('italic')}>I</button>
      <button className={buttonStyle} onClick={() => setStyle('underline')}>U</button>
      <button className={buttonStyle} onClick={() => setStyle('strikeThrough')}>S</button>
      <button className={buttonStyle} onClick={() => setStyle('insertOrderedList')}>OL</button>
      <button className={buttonStyle} onClick={() => setStyle('insertUnorderedList')}>UL</button>
      <div
        id="editor"
        ref={editorRef}
        contentEditable={true}
        className="border border-black border-solid rounded min-h-32 p-2 mx-5"
      ></div>
    </>
  );
};

export default BasicEditor;
