import {
  ActionIcon,
  Button,
  Header,
  Input,
  PasswordInput,
  Table,
  TextInput,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import Head from "next/head";
import Link from "next/link";
import { convertMoney } from "../../../utils/string";
import styles from "./styles.module.css";

interface IProduct {
  id_cremosinho: number;
  sabor: string;
  vlr_unitario: string;
  qtd_estoque: string;
  inativo: "f" | "v";
}

const elements: IProduct[] = [
  {
    id_cremosinho: 12,
    sabor: "Ninho c/ Morango",
    vlr_unitario: "4.50",
    qtd_estoque: "20",
    inativo: "f",
  },
  {
    id_cremosinho: 14,
    sabor: "Nutella ",
    vlr_unitario: "4.00",
    qtd_estoque: "15",
    inativo: "f",
  },
  {
    id_cremosinho: 8,
    sabor: "Uva",
    vlr_unitario: "3.50",
    qtd_estoque: "12",
    inativo: "f",
  },
];

const ths = (
  <tr>
    <th>Sabor</th>
    <th>Preço</th>
    <th>Quantidade</th>
    <th>Ações</th>
  </tr>
);

const rows = elements.map((element) => (
  <tr key={element.id_cremosinho}>
    <td>{element.sabor}</td>
    <td>{convertMoney(element.vlr_unitario)}</td>
    <td>{element.qtd_estoque}</td>
    <td className={styles.tableFlex}>
      <ActionIcon size={20} color="blue">
        <IconEdit />
      </ActionIcon>
      <ActionIcon size={20} color="red">
        <IconTrash />
      </ActionIcon>
    </td>
  </tr>
));

interface IResultProduct {
  vlr_total: number;
  quantidade: number;
}

const Product = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className={styles.header} bg="blue.6" height={80}>
        <Link href={"/dashboard"}>Venda</Link>
        <Link href={"dashboard/delivereyman"}>Entregador</Link>
        <Link className={styles.active} href={"dashboard/product"}>
          Produtos
        </Link>
        <Link href={"/"}>Sair</Link>
      </Header>

      <main className={styles.containerProduct}>
        <div className={styles.tableStyle}>
          <Button color="blue" size="md">
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

export default Product;
