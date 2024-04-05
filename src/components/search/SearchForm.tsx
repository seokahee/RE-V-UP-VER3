"use client";
import useInput from "@/hooks/useInput";
import { useSearchedStore } from "@/shared/store/searchStore";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const SearchForm = () => {
  const { form: keywordInput, onChange } = useInput({
    keyword: "",
    selectedTabs: "musicInfo",
  });
  const { keyword, selectedTabs } = keywordInput;
  const searched = useSearchedStore((state) => state.searched); // 스토어에서 set 함수 가져오기 (유즈셀렉토와 같음)
  const router = useRouter();
  const keywordRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) {
      alert("검색 키워드를 입력해 주세요");
      return keywordRef.current?.focus();
    }
    searched(keyword, selectedTabs); // 스토어 set 함수에 저장할 값 넣어주기 (디스패치에 페이로드 넣어주는것과 같음)
    router.push("/search");
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <select name="selectedTabs" value={selectedTabs} onChange={onChange}>
          <option value="musicInfo">노래 or 가수</option>
          <option value="community">커뮤니티 제목</option>
        </select>
        <input
          type="text"
          name="keyword"
          value={keyword}
          ref={keywordRef}
          onChange={onChange}
          className="border  border-black"
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchForm;
