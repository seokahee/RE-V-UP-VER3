export const onCommentHandler = (itemDate: string) => {
  const date = new Date(itemDate).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  return date;
};
