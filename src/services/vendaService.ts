import { api } from "../utils/api";

export interface IVendaView {
  id_venda: string;
  cliente: string;
  total_da_venda: string;
  data_da_venda: string;
  entrega: string;
  entregador: string;
  dt_entrega: string;
  pago: string;
  forma_de_pagamento: string;
  status_da_venda: string;
}

export interface IProductItens {
  id_cremosinho: number;
  id_venda: number;
  qtd: number;
  valor: number;
}

export interface IVenda {
  id_venda: number;
  id_forma_pagamento: number;
  id_status: number;
  id_entregador: number;
  id_usuario: number;
  itens: IProductItens[];
  dt_entrega: string;
  entregador: string;
  pago: string;
  total: string;
}

export interface IVendaType extends IVenda {
  id_venda: number;
}

export const getVenda = async () => {
  const { data } = await api.get("/vendas");

  return data as IVendaView[];
};

export const postVenda = async (cremosinho: IVenda) => {
  const { data } = await api.post("/venda", cremosinho);

  return data;
};

export const putVenda = async (cremosinho: IVenda) => {
  const { data } = await api.put(`/venda/${cremosinho.id_venda}`, cremosinho);

  return data;
};

// export const putCremosinho = async (cremosinho: IVendaPrice) => {
//     const { data } = await api.put(
//         `/cremosinho/${cremosinho.id_cremosinho}`,
//         cremosinho
//     );

//     return data;
// };

// export const deleteCremosinho = async (id: number) => {
//     const { data } = await api.delete(`/cremosinho/${id}`);

//     return data;
// };
