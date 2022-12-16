import { api } from "../utils/api";

export interface ICremosinho {
  sabor: string;
  vlr_unitario: string;
  qtd_estoque: number;
  inativo: "f" | "v";
  id_cremosinho?: number;
}

export interface ICremosinhoPrice {
  sabor: string;
  vlr_unitario: number;
  qtd_estoque: number;
  inativo: "f" | "v";
  id_cremosinho?: number;
}

export interface ICremosinhoType extends ICremosinho {
  id_cremosinho: number;
}

export const getCremosinho = async () => {
  const { data } = await api.get("/cremosinhos");

  return data as ICremosinhoType[];
};

export const postCremosinho = async (cremosinho: ICremosinhoPrice) => {
  const { data } = await api.post("/cremosinho", cremosinho);

  return data;
};

export const putCremosinho = async (cremosinho: ICremosinhoPrice) => {
  const { data } = await api.put(
    `/cremosinho/${cremosinho.id_cremosinho}`,
    cremosinho
  );

  return data;
};

export const deleteCremosinho = async (id: number) => {
  const { data } = await api.delete(`/cremosinho/${id}`);

  return data;
};
