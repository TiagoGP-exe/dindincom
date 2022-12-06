import { Button, Header, Input, PasswordInput, TextInput } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.css";

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className={styles.header} bg="blue.6" height={80}>
        <Link className={styles.active} href={"/dashboard"}>
          Venda
        </Link>
        <Link href={"/delivereyman"}>Entregador</Link>
        <Link href={"dashboard/product"}>Produtos</Link>
        <Link href={"/"}>Sair</Link>
      </Header>
    </div>
  );
};

export default Dashboard;
