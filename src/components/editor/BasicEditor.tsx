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
    <div className="mx-5">
      <input
        className="mt-3 px-10 py-4 border border-black border-solid rounded w-[95%]"
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className="flex flex-row space-x-1 my-3">
        <ImageInput />
        <ActionButton
          actionValue="undo"
          actionSymbol="/images/undo.svg"
          ref={editorRef}
        />
        <ActionButton
          actionValue="redo"
          actionSymbol="/images/redo.svg"
          ref={editorRef}
        />
      </div>
      <ChangeFontStyle ref={editorRef} />
      <ChangeFont ref={editorRef} />
      <ChangeFontSize ref={editorRef} />
      <div className="flex flex-row space-x-1 my-3">
        <ActionButton
          actionValue="justifyFull"
          actionSymbol="/images/align-full.svg"
          ref={editorRef}
        />
        <ActionButton
          actionValue="justifyLeft"
          actionSymbol="/images/align-left.svg"
          ref={editorRef}
        />
        <ActionButton
          actionValue="justifyCenter"
          actionSymbol="/images/align-center.svg"
          ref={editorRef}
        />
        <ActionButton
          actionValue="justifyRight"
          actionSymbol="/images/align-right.svg"
          ref={editorRef}
        />
      </div>
      <ChangeFontColor ref={editorRef} />
      <ChangeFontBackground ref={editorRef} />
      <div
        id="editor"
        ref={editorRef}
        contentEditable
        className="my-3 p-10 border border-black border-solid rounded min-h-32 w-[95%] [&>img]:w-full"
      ></div>
      <SelectMusic />
      <button
        className="my-3 w-[100px] h-[30px] border border-solid border-black rounded"
        onClick={submitHandler}
      >
        submit
      </button>
    </div>
  );
};

export default BasicEditor;
