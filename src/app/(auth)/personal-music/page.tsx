"use client";

import { useState } from "react";

const PersonalPage = () => {
  const [page, setPage] = useState(0);

  const questionList = [
    {
      q: ["성별이 어떻게 되십니까?"],
      a: [
        { type: "M", text: "남자" },
        { type: "W", text: "여자" },
      ],
    },
    {
      q: ["외향/내향"],
      a: [
        { type: "E", text: "E" },
        { type: "I", text: "I" },
      ],
    },
    {
      q: ["사고/감각"],
      a: [
        { type: "F", text: "F" },
        { type: "T", text: "T" },
      ],
    },
    {
      q: ["감각/직관"],
      a: [
        { type: "S", text: "S" },
        { type: "N", text: "N" },
      ],
    },
    {
      q: ["판단/인식"],
      a: [
        { type: "P", text: "P" },
        { type: "J", text: "J" },
      ],
    },
    {
      q: ["결과보러가기"],
      a: [{ type: "", text: "결과쓰~~" }],
    },
  ];

  const [mbtiList, setMbtiList] = useState([
    { name: "I", count: 0 },
    { name: "E", count: 0 },
    { name: "S", count: 0 },
    { name: "N", count: 0 },
    { name: "T", count: 0 },
    { name: "P", count: 0 },
    { name: "F", count: 0 },
    { name: "J", count: 0 },
  ]);

  const handleCkAnswer = (type, idx) => {
    let ls = mbtiList;
    for (let i = 0; i < ls.length; i++) {
      if (ls[i].name === type) {
        ls[i].count = ls[i].count + 1;
      }
    }
    setPage(page + 1);
    if (idx + 1 === questionList.length) {
      console.log("결과보기");
    }
  };

  return (
    <div>
      <div>음악 취향을 진단해보세요!</div>
      {page === 0 ? (
        <div onClick={() => setPage(1)}>테스트하기</div>
      ) : page <= questionList.length ? (
        <div>
          테스트 페이지
          <div>{`${page} / ${questionList.length}`}</div>
          <div>
            {questionList.map((val, idx) => (
              <div style={{ display: page === idx + 1 ? "flex" : "none" }}>
                <div>
                  {val.q.map((qval, qidx) => (
                    <div>{qval}</div>
                  ))}
                </div>
                <div>
                  {val.a.map((aval, aidx) => (
                    <div onClick={() => handleCkAnswer(aval.type, aidx)}>
                      {aval.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          결과페이지
          <div>당신의 음악취향은 입니다.</div>
          <button>마이플레이리스트에 담기</button>
          <button>현재 재생목록에 담기</button>
        </div>
      )}
    </div>
  );
};

export default PersonalPage;
