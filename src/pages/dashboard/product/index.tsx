import {
  ActionIcon,
  Button,
  Header,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC, useState } from "react";
import { AddCremosinho } from "../../../components/AddCremosinho";
import {
  deleteCremosinho,
  getCremosinho,
  ICremosinho,
  ICremosinhoType,
  postCremosinho,
  putCremosinho,
} from "../../../services/cremosinhoService";
import { convertMoney } from "../../../utils/string";
import styles from "./styles.module.css";
import { onlyNumbers } from "../../../utils/number";

const ths = (
  <tr>
    <th>Sabor</th>
    <th>Preço</th>
    <th>Quantidade</th>
    <th>Ações</th>
  </tr>
);
interface ProductProps {
  allCremosinho: ICremosinhoType[];
}

const Product: FC<ProductProps> = ({ allCremosinho }) => {
  const [cremosinho, setCremosinho] =
    useState<ICremosinhoType[]>(allCremosinho);

  const rows = cremosinho.map((element) => (
    <tr key={element.id_cremosinho}>
      <td>{element.sabor}</td>
      <td>{convertMoney(element.vlr_unitario)}</td>
      <td>{element.qtd_estoque}</td>
      <td className={styles.tableFlex}>
        <ActionIcon onClick={() => modalUpdate(element)} size={20} color="blue">
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          onClick={() => openDeleteModal(element.id_cremosinho, element.sabor)}
          size={20}
          color="red"
        >
          <IconTrash />
        </ActionIcon>
      </td>
    </tr>
  ));

  const addProduct = async (data: ICremosinho) => {
    console.log((onlyNumbers(data.vlr_unitario) / 100).toFixed(0));

    try {
      await postCremosinho({
        ...data,
        inativo: "f",
        vlr_unitario: onlyNumbers(data.vlr_unitario) / 100,
      });
      closeAllModals();
      const response = await getCremosinho();
      setCremosinho(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (data: ICremosinho) => {
    try {
      await putCremosinho({
        ...data,
        vlr_unitario: onlyNumbers(data.vlr_unitario) / 100,
      });
      closeAllModals();
      const response = await getCremosinho();
      setCremosinho(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modalUpdate = (data: ICremosinho) =>
    openModal({
      title: "Editar Produto",
      centered: true,
      radius: "md",
      children: (
        <AddCremosinho
          onClose={closeAllModals}
          onSubmit={updateProduct}
          value={data}
        />
      ),
    });

  const modalAdd = () =>
    openModal({
      title: "Adicionar Produto",
      centered: true,
      radius: "md",
      children: (
        <AddCremosinho onClose={closeAllModals} onSubmit={addProduct} />
      ),
    });

  const deleteProduct = async (id: number) => {
    try {
      await deleteCremosinho(id);
      const response = await getCremosinho();
      closeAllModals();
      setCremosinho(response);
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = (id: number, name: string) =>
    openConfirmModal({
      title: "Excluir Produto",
      centered: true,
      children: <Text size="sm">Deletar o produto "{name}" ?</Text>,
      labels: { confirm: "Excluir o produto", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("cancel"),
      onConfirm: () => deleteProduct(id),
    });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className={styles.header} bg="blue.6" height={80}>
        <Link href={"/dashboard"}>Venda</Link>
        <Link href={"dashboard/deliveryman"}>Entregador</Link>
        <Link className={styles.active} href={"dashboard/product"}>
          Produtos
        </Link>
        <Link href={"/"}>Sair</Link>
      </Header>

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
    const response = await getCremosinho();

    return {
      props: {
        allCremosinho: response,
      },
    };
  } catch {
    return {
      props: {
        allCremosinho: [],
      },
    };
  }
}

export default Product;
