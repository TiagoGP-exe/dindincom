import { api } from "../utils/api";

export interface IUsuario {
  nome: string;
  telefone: string;
  endereco: string;
  email: string;
  senha:string;
  id_usuario: number;
}

export interface IUsuarioType extends IUsuario {
  id_usuario: number;
}

export const getUsuario = async () => {
  const { data } = await api.get("/usuarios");

  return data as IUsuarioType[];
};

export const postUsuario = async (usuario: IUsuario) => {
  const { data } = await api.post("/usuario", usuario);

  return data;
};

export const putUsuario = async (usuario: IUsuarioType) => {
  const { data } = await api.put(
    `/usuario/${usuario.id_usuario}`,
    usuario
  );

  return data;
};

export const deleteUsuario = async (id: number) => {
  const { data } = await api.delete(`/usuario/${id}`);

  return data;
};
