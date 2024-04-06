import React from "react";

const Footer = () => {
  return (
    <footer className="footer border border-solid border-black p-8 ">
      <div>
        <p>V-UP</p>
      </div>
      <div className=" flex flex-row">
        <div className="basis-1/2">
          <div className=" flex flex-row gap-8">
            <div className=" w-40">front-end Developer</div>
            <div className=" grid grid-cols-5 gap-4">
              <div>조연진</div>
              <div>성예지</div>
              <div>남해리</div>
              <div>강지수</div>
              <div>서가희</div>
            </div>
          </div>
          <div className=" flex flex-row gap-8">
            <p className="w-40">UXUI Designer</p>
            <p className="">전주용</p>
          </div>
        </div>
        <div className=" basis-1/2">
          <p>© 2024 VakVakVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
