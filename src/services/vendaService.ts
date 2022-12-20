import { api } from "../utils/api";

export interface IVendaView {
    cliente: string;
    total_da_venda: string;
    entrega: string;
    entregador: string;
    dt_entrega: string;
    pago: string;
    forma_de_pagamento: string;
    status_da_venda: string;
}

export interface IProductItens {
    id_cremosinho : number;
    id_venda:number;
    qtd: number;
    valor: number;
}

export interface IVenda {
    id_forma_pagamento: number;
    id_status: number;
    id_entregador: number;
    id_usuario: number;
   itens: IProductItens[];
    dt_entrega:string;
    entregador: string;
    pago: string;
    total: string;
}



export const getCremosinho = async () => {
    const { data } = await api.get("/vendas");

    return data as IVendaView[];
};

export const postCremosinho = async (cremosinho: IVenda) => {
    const { data } = await api.post("/venda", cremosinho);

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
