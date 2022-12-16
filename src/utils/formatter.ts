export const formattedValue = (value: number | string, isDisivible?: boolean) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(isDisivible ? Number(value) / 100 : Number(value) || 0);

export const formattedCpf = (value: string) => {
  const cpf = value.replace(/\D/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
