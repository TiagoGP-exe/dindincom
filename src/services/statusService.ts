import { api } from "../utils/api";

export interface IStatus {
  nome: string;
  id_status?: number;
}

export interface IStatusType extends IStatus {
    id_status: number;
}

export const getStatus = async () => {
  const { data } = await api.get("/status");

  return data as IStatusType[];
};


