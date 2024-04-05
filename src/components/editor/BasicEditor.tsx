import React, { useRef } from "react";
import ChangeFont from "./ChangeFont";
import ChangeFontSize from "./ChangeFontSize";
import ChangeFontStyle from "./ChangeFontStyle";
import SelectMusic from "./SelectMusic";
import ChangeFontColor from "./ChangeFontColor";
import ChangeFontBackground from "./ChangeFontBackground";
import ActionButton from "./ActionButton";

const BasicEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const submitHandler = async () => {
    console.log(editorRef.current?.innerHTML);
  };

  return (
    <>
      <ActionButton actionValue="undo" ref={editorRef} />
      <ActionButton actionValue="redo" ref={editorRef} />
      <ChangeFontStyle ref={editorRef} />
      <ChangeFont ref={editorRef} />
      <ChangeFontSize ref={editorRef} />
      <ChangeFontColor ref={editorRef} />
      <ChangeFontBackground ref={editorRef} />
      <div
        id="editor"
        ref={editorRef}
        contentEditable
        className={`mx-5 p-10 border border-black border-solid rounded min-h-32 [&>img]:w-full`}
      ></div>
      <SelectMusic />
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
