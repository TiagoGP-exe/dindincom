import { api } from "../utils/api";

export interface ILogin {
    email: string;
    senha: string;
  }


export const login = async (login: ILogin) => {
    const { data } = await api.post("/login", login);
  
    return data;
  };
  