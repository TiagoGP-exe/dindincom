export const convertMoney = (value: string | number) =>
  Number(value).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

export const convertDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString("pt-br");
};
