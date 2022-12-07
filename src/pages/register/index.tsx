import style from './styles.module.css';

import {Button, PasswordInput, TextInput } from '@mantine/core';
import Link from 'next/link';
import styles from './styles.module.css';

 const Register = () => {
    return (
        <div className={styles.registerContainer}>
          <main className={styles.registerCard}>
            <p className={styles.title}>Criar conta</p>

            <span className={styles.obs}> Deseja voltar para a página inicial ? Ir para <Link href={'/'}>página inicial</Link>  </span>
           
            <TextInput label="Nome" size='md'/>
            <TextInput label="Endereço" size='md'/>
            <TextInput label="Telefone" size='md'/>
            <TextInput label="E-mail" size='md'/>
            <PasswordInput label="Senha" size='md'/>


            <Button color='blue' size="md">Registrar</Button>
           
            <span className={styles.obs}>Já possui uma conta ? Ir para o <Link href={'/login'}>Login</Link> </span>
          </main>
        </div>
    )
}

export default Register;