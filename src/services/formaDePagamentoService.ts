import { api } from "../utils/api";

export interface IFormaDePagamento {
  descricao: string;
  id_forma_pagamento?: number;
}

export interface IFormaDePagamentoType extends IFormaDePagamento {
    id_forma_pagamento: number;
}

export const getFormaDePagamento = async () => {
  const { data } = await api.get("/forma_pagamento");

  return data as IFormaDePagamentoType[];
};


