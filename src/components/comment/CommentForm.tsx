"use client";

import { useStore } from "@/shared/store";

const CommentForm = () => {
  const { userInfo } = useStore();

  return (
    <>
      <p>댓글 달기</p>
      <div>
        <form>
          <label className="relative ">
            <input
              type="text"
              placeholder="댓글을 작성해주세요"
              className="w-96 border-2 border-rose-600"
            />
            <div className="absolute bottom-0 right-0">
              <button>등록하기▷</button>
            </div>
          </label>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
