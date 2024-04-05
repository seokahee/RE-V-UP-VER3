"use client";

import React, { useEffect, useRef, useState } from "react";

const Canvas = () => {
  //그리기에 사용할 캔버스 요소에 대한 참조
  const canvasRef = useRef(null);
  //그리기 컨텍스트를 저장할 곳
  const [context, setContext] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
    }
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="border-2 border-rose-600"
    />
  );
};

export default Canvas;
