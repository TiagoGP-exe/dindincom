import { Button, Input, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import styles from "./styles.module.css";

const Register = () => {
  return (
    <div className={styles.registerContainer}>
      <main className={styles.registerCard}>
        <p className={styles.title}>Registro</p>
        <span className={styles.obs}>
          Deseja voltar para tela inicial? <Link href="/">Tela inicial</Link>
        </span>
        <TextInput label="Nome" size="md" />
        <TextInput label="E-mail" size="md" />
        <TextInput label="Endereço" size="md" />
        <TextInput label="Telefone" size="md" />
        <PasswordInput label="Senha" size="md" />

        <Button color="blue" size="md">
          Entrar
        </Button>
        <span className={styles.obs}>
          Já possui uma conta ? <Link href="/login">Login</Link>
        </span>
      </main>
    </div>
  );
};

export default Register;
