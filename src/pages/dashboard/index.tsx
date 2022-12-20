import { Button, Header, Input, PasswordInput, TextInput } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.css";
import { HeaderDashboard } from "../../components/HeaderDashboard";

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>Din Din Com</title>
        <meta name="description" content="Generated by Din Din Com" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <HeaderDashboard />
      <main className={styles.containerProduct}>
        <div className={styles.tableStyle}>
          <Button
            component={Link}
            href="/dashboard/create"
            color="blue"
            size="md"
          >
            Adicionar
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
