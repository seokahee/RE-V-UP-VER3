// utility function

export const onDateHandler = (itemDate: string) => {
  const date = new Date(itemDate).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return date;
};

export const getToday = () => {
  const today = new Date();
  const date = today.toISOString();

  return date;
};
