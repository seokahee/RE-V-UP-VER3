import React, { useState } from "react";

type TabProps = {
  data: {
    id: number;
    title: string;
    content: React.JSX.Element;
  }[];
};

const TabMenu = ({ data }: TabProps) => {
  const [isActive, setIsActive] = useState(0);

  const onClickTab = (idx: number) => {
    setIsActive(idx);
  };

  return (
    <div>
      {data.map((item, idx) => {
        return (
          <button key={item.id} type="button" onClick={() => onClickTab(idx)} className={`${isActive === idx && "text-blue-600"}`}>
            {item.title}
          </button>
        );
      })}
      <div>{data[isActive].content}</div>
    </div>
  );
};

export default TabMenu;
