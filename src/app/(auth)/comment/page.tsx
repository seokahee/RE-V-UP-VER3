import CommentForm from "@/components/comments/CommentForm";
import CommentsList from "@/components/comments/CommentsList";
import React from "react";

const page = () => {
  return (
    <>
      <CommentsList />
      <CommentForm />
    </>
  );
};

export default page;
