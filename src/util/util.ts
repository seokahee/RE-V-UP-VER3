export const onDateHandler = (itemDate: any) => {
  const date = new Date(itemDate).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return date;
};

