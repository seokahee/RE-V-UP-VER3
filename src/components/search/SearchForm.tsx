"use client";
import useInput from "@/hooks/useInput";
import { useSearchedStore } from "@/shared/store/searchStore";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SearchForm = () => {
  const router = useRouter();

  const { form: keywordInput, onChange } = useInput({
    keyword: "",
    selectedTabs: "musicInfo",
  });
  const { keyword, selectedTabs } = keywordInput;
  const {} = useSearchedStore((state) => state.searchedKeyword); // 이거 물어볼것

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    useSearchedStore.setState(() => ({
      searchedKeyword: { keyword, selectedTabs },
    }));
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
          onChange={onChange}
          className="border  border-black"
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchForm;
