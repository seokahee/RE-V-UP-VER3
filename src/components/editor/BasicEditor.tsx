import React, { useRef, useState } from "react";
import ChangeFont from "./ChangeFont";
import ChangeFontSize from "./ChangeFontSize";
import ChangeFontStyle from "./ChangeFontStyle";
import SelectMusic from "./SelectMusic";
import ChangeFontColor from "./ChangeFontColor";
import ChangeFontBackground from "./ChangeFontBackground";
import ActionButton from "./ActionButton";
import ImageInput from "./ImageInput";

const BasicEditor = () => {
  const [title, setTitle] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const date = today.toISOString();

  const submitHandler = async () => {
    const data = {
      boardTitle: title,
      content: editorRef.current?.innerHTML,
      date,
      userId: "",
      musicId: "",
      likeList: [],
    };

    console.log(data);
  };

  return (
    <>
      <input
        className="mx-5 mt-5 px-10 py-4 border border-black border-solid rounded w-[95%]"
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
      />
      <ImageInput />
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
        className={`mx-5 p-10 border border-black border-solid rounded min-h-32 w-[95%] [&>img]:w-full`}
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
