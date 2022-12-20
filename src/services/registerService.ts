import { api } from "../utils/api";

export interface IRegister {
    nome: string;
    telefone: string;
    endereco: string;
    email: string;
    senha: string;
  }


export const registerPost = async (register: IRegister) => {
    const { data } = await api.post("/register", register);
  
    return data;
  };
  