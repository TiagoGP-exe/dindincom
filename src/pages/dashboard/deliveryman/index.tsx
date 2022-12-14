import { ActionIcon, Button, Header, Table, Text } from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC, useState } from "react";
import { AddEntregador } from "../../../components/AddEntregador";
import { showNotification } from '@mantine/notifications';

import {
  IEntregador,
  IEntregadorType,
  deleteEntregador,
  getEntregador,
  postEntregador,
  putEntregador,
} from "../../../services/entregadorService";
import { formattedCpf } from "../../../utils/formatter";
import { onlyNumbers } from "../../../utils/number";
import styles from "./styles.module.css";
import { HeaderDashboard } from "../../../components/HeaderDashboard";

const ths = (
  <tr>
    <th>Nome</th>
    <th>CPF</th>
    <th>Placa veiculo</th>
    <th>Telefone</th>
    <th>Rota</th>
    <th>Ações</th>
  </tr>
);
interface DeliveryManProps {
  allEntregador: IEntregadorType[];
}

const DeliveryMan: FC<DeliveryManProps> = ({ allEntregador }) => {
  const [cremosinho, setCremosinho] =
    useState<IEntregadorType[]>(allEntregador);

  const rows = cremosinho.map((element) => (
    <tr key={element.id_entregador}>
      <td>{element.nome}</td>
      <td>{formattedCpf(element.cpf)}</td>
      <td>{element.placa_veiculo}</td>
      <td>{element.telefone}</td>
      <td>{element.rota}</td>
      <td className={styles.tableFlex}>
        <ActionIcon onClick={() => modalUpdate(element)} size={20} color="blue">
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          onClick={() => openDeleteModal(element.id_entregador, element.nome)}
          size={20}
          color="red"
        >
          <IconTrash />
        </ActionIcon>
      </td>
    </tr>
  ));

  const addDeliveryMan = async (data: IEntregador) => {
    try {
      await postEntregador({
        ...data,
        cpf: String(onlyNumbers(data.cpf)),
      });
      showNotification({
        title: 'Sucesso',
        message: 'Entregador cadastrado com sucesso',
      })
      closeAllModals();
      const response = await getEntregador();
      setCremosinho(response);
    } catch (error) {
      console.log(error);
      showNotification({
        title: 'Erro',
        message: 'Houve um erro ao cadastrar o entregador',
      })
    }
  };

  const updateDeliveryMan = async (data: IEntregadorType) => {
    try {
      await putEntregador({
        ...data,
        cpf: String(onlyNumbers(data.cpf)),
      });
      closeAllModals();
      const response = await getEntregador();
      setCremosinho(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modalUpdate = (data: IEntregadorType) => {
    console.log(data);
    openModal({
      title: "Editar Entregador",
      centered: true,
      radius: "md",
      children: (
        <AddEntregador
          onClose={closeAllModals}
          onSubmit={updateDeliveryMan}
          value={data}
        />
      ),
    });
  };

  const modalAdd = () =>
    openModal({
      title: "Adicionar Entregador",
      centered: true,
      radius: "md",
      children: (
        <AddEntregador onClose={closeAllModals} onSubmit={addDeliveryMan} />
      ),
    });

  const deleteDeliveryMan = async (id: number) => {
    try {
      await deleteEntregador(id);
      const response = await getEntregador();
      closeAllModals();
      setCremosinho(response);
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = (id: number, name: string) =>
    openConfirmModal({
      title: "Excluir Entregador",
      centered: true,
      children: <Text size="sm">Deletar o entregador "{name}" ?</Text>,
      labels: { confirm: "Excluir", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("cancel"),
      onConfirm: () => deleteDeliveryMan(id),
    });

  return (
    <div>
      <Head>
        <title>Entregador CRUD</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <HeaderDashboard />

      <main className={styles.containerProduct}>
        <div className={styles.tableStyle}>
          <Button onClick={modalAdd} color="blue" size="md">
            Adicionar
          </Button>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const response = await getEntregador();

    return {
      props: {
        allEntregador: response,
      },
    };
  } catch {
    return {
      props: {
        allEntregador: [],
      },
    };
  }
}

export default DeliveryMan;
