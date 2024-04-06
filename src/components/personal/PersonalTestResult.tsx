import React from "react";
import ResultChart from "@/components/personal/ResultChart";

const PersonalTestResult = () => {
  return (
    <div>
      결과페이지
      <div>당신의 음악취향은 입니다.</div>
      <div>
        <ResultChart />
      </div>
      <div>추천음악 리스트</div>
      <button>마이플레이리스트에 담기</button>
      <button>현재 재생목록에 담기</button>
    </div>
  );
};

export default PersonalTestResult;
