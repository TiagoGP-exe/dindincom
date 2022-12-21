import { Button, Input, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerPost } from "../../services/registerService";
import { useForm } from "react-hook-form";
import { showNotification } from '@mantine/notifications';

const schema = yup.object({
  nome: yup.string().required('nome é um campo necessário'),
  telefone: yup.string(),
  endereco: yup.string(),
  email: yup.string().email('email inválido').required('email é um campo obrigatório'),
  senha: yup.string().min(4, 'senha deve ter no minimo 4 caracteres').required('senha é um campo obrigatório'),

}).required();

interface IForm {
  nome: string;
  telefone: string;
  endereco: string;
  email: string;
  senha: string;
}

const Register = () => {
  const router = useRouter();
  const {register,handleSubmit,setError,formState: { errors }  } = useForm<IForm>({
    resolver: yupResolver(schema)
  });

  const processandoRegistro = async (data:IForm) =>{
    try {
     await registerPost(data)
     showNotification({
      title: 'Sucesso',
      message: 'Seu login foi realizado com sucesso',
    })
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Houve um erro ao cadastrar',
      })
    }
 
}
  return (
    <form onSubmit={handleSubmit(processandoRegistro)} className={styles.registerContainer}>
      <main className={styles.registerCard}>
       
        <p className={styles.title}>Registro</p>
        <span className={styles.obs}>
          Deseja voltar para tela inicial? <Link href="/">Tela inicial</Link>
        </span>
        <TextInput label="Nome" size="md" {...register('nome')} error={errors.nome?.message}/>
        <TextInput label="E-mail" size="md"  {...register('email')} error={errors.email?.message}/>
        <TextInput label="Endereço" size="md"  {...register('endereco')} error={errors.endereco?.message}/>
        <TextInput label="Telefone" size="md"  {...register('telefone')} error={errors.telefone?.message}/>
        <PasswordInput label="Senha" size="md" {...register('senha')} error={errors.senha?.message}/>

        <Button color="blue" size="md" type="submit">
          Entrar
        </Button>
        <span className={styles.obs}>
          Já possui uma conta ? <Link href="/login">Login</Link>
        </span>
        
      </main>
      </form>
  );
};

export default Register;
