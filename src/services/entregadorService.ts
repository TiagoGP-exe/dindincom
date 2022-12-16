import { api } from "../utils/api";

export interface IEntregador {
  nome: string;
  cpf: string;
  telefone: string;
  placa_veiculo: string;
  rota: string;
}

export interface IEntregadorType extends IEntregador {
  id: number;
}

export const getEntregador = async () => {
  const { data } = await api.get("/entregador");

  return data as IEntregador[];
};

export const postEntregador = async (entregador: IEntregador) => {
  const { data } = await api.post("/entregador", entregador);

  return data;
};

export const putEntregador = async (entregador: IEntregadorType) => {
  const { data } = await api.put(`/entregador/${entregador.id}`, entregador);

  return data;
};

export const deleteEntregador = async (cpf: string) => {
  const { data } = await api.delete(`/entregador/${cpf}`);

  return data;
};
