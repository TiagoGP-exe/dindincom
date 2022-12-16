export const formattedValue = (value: number | string, isDisivible?: boolean) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(isDisivible ? Number(value) / 100 : Number(value) || 0);
