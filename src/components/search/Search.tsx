"use client";
import useInput from "@/hooks/useInput";
import React from "react";

const Search = () => {
  const {
    form: keywordInput,
    setForm,
    onChange,
    reset,
  } = useInput({
    keyword: "",
  });

  const { keyword } = keywordInput;

  const onSubmitHandler = (e: any) => {
    e.preventDefault();

    // const { data, error } = await supabase
    //   .from("community")
    //   .select("boardTitle")
    //   .like("boardTitle", `%${values.keyword}%`)
    //   .order("date");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <select>
        <option value="music">노래 or 가수</option>
        <option value="community">커뮤니티 제목</option>
      </select>
      <input
        type="text"
        name="keyword"
        value={keyword}
        onChange={onChange}
        className="border  border-black"
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default Search;
