export const convertMoney = (value: string | number) =>  Number(value).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });