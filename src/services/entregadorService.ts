import { api } from "../utils/api";

export interface IEntregador {
  nome: string;
  cpf: string;
  telefone: string;
  placa_veiculo: string;
  rota: string;
  id_entregador?: number;
}

export interface IEntregadorType extends IEntregador {
  id_entregador: number;
}

export const getEntregador = async () => {
  const { data } = await api.get("/entregadores");

  return data as IEntregadorType[];
};

export const postEntregador = async (entregador: IEntregador) => {
  const { data } = await api.post("/entregador", entregador);

  return data;
};

export const putEntregador = async (entregador: IEntregadorType) => {
  const { data } = await api.put(
    `/entregador/${entregador.id_entregador}`,
    entregador
  );

  return data;
};

export const deleteEntregador = async (id: number) => {
  const { data } = await api.delete(`/entregador/${id}`);

  return data;
};
