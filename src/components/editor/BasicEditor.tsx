import React, { useRef } from "react";
import ChangeFont from "./ChangeFont";
import ChangeFontSize from "./ChangeFontSize";
import ChangeFontStyle from "./ChangeFontStyle";

const BasicEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const submitHandler = async () => {
    console.log(editorRef.current?.innerHTML);
  };

  return (
    <>
      <ChangeFontStyle ref={editorRef} />
      <ChangeFont ref={editorRef} />
      <ChangeFontSize ref={editorRef} />
      <div
        id="editor"
        ref={editorRef}
        contentEditable
        className={`mx-5 p-10 border border-black border-solid rounded min-h-32 [&>img]:w-full`}
      ></div>
      <button
        className="btn ml-5 mr-2 my-5 p-1 border border-solid border-black rounded"
        onClick={submitHandler}
      >
        submit
      </button>
    </>
  );
};

export default BasicEditor;
