import { ActionIcon, Button, Header, Table, Text } from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC, useState } from "react";
import { AddUsuario } from "../../../components/AddUsuario";
import {
  IUsuario,
  IUsuarioType,
  deleteUsuario,
  getUsuario,
  postUsuario,
  putUsuario,
} from "../../../services/usuarioService";
import styles from "./styles.module.css";
import { HeaderDashboard } from "../../../components/HeaderDashboard";

const ths = (
  <tr>
    <th>Nome</th>
    <th>Telefone</th>
    <th>Endereço</th>
    <th>E-mail</th>
    <th>Ações</th>
  </tr>
);
interface UsuarioProps {
  allUsuario: IUsuarioType[];
}

const Usuario: FC<UsuarioProps> = ({ allUsuario }) => {
  const [usuario, setUsuario] = useState<IUsuarioType[]>(allUsuario);

  const rows = usuario.map((element) => (
    <tr key={element.id_usuario}>
      <td>{element.nome}</td>
      <td>{element.telefone}</td>
      <td>{element.endereco}</td>
      <td>{element.email}</td>
      <td className={styles.tableFlex}>
        <ActionIcon onClick={() => modalUpdate(element)} size={20} color="blue">
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          onClick={() => openDeleteModal(element.id_usuario, element.nome)}
          size={20}
          color="red"
        >
          <IconTrash />
        </ActionIcon>
      </td>
    </tr>
  ));

  const addUsuario = async (data: IUsuario) => {
    try {
      await postUsuario({
        ...data,
      });
      closeAllModals();
      const response = await getUsuario();
      setUsuario(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUsuario = async (data: IUsuario) => {
    try {
      await putUsuario({ ...data });
      closeAllModals();
      const response = await getUsuario();
      setUsuario(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modalUpdate = (data: IUsuario) =>
    openModal({
      title: "Editar Produto",
      centered: true,
      radius: "md",
      children: (
        <AddUsuario
          onClose={closeAllModals}
          onSubmit={updateUsuario}
          value={data}
        />
      ),
    });

  const modalAdd = () =>
    openModal({
      title: "Adicionar Produto",
      centered: true,
      radius: "md",
      children: <AddUsuario onClose={closeAllModals} onSubmit={addUsuario} />,
    });

  const deleteUsuarioModal = async (id: number) => {
    try {
      await deleteUsuario(id);
      const response = await getUsuario();
      closeAllModals();
      setUsuario(response);
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = (id: number, name: string) =>
    openConfirmModal({
      title: "Excluir Usuário",
      centered: true,
      children: <Text size="sm">Deletar o usuário "{name}" ?</Text>,
      labels: { confirm: "Excluir o usuário", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("cancel"),
      onConfirm: () => deleteUsuarioModal(id),
    });

  return (
    <div>
      <Head>
        <title>Usuario CRUD</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
    const response = await getUsuario();

    return {
      props: {
        allUsuario: response,
      },
    };
  } catch {
    return {
      props: {
        allUsuario: [],
      },
    };
  }
}

export default Usuario;
