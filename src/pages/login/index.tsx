import { Button, Input, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import styles from "./styles.module.css";
import * as yup from "yup";
import {useRouter} from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import {login} from '../../services/loginService';
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { showNotification } from '@mantine/notifications';

interface IForm {
  email: string;
  senha: string;
}

const schema = yup.object({
  email: yup.string().email('email inválido').required('email é obrigatório'),
   senha: yup
   .string()
   .min(4,'senha deve ter no minimo 4 digitos')
   .required('senha deverá ser digitada')
 })

const Login = () => {
  const router = useRouter();
  const {register,handleSubmit,setError,formState: { errors }  } = useForm<IForm>({
    resolver: yupResolver(schema)
  });

  const processandoLogin = async (data:IForm) =>{
    try {
     const name = await login(data);
      router.push('/');
      Cookies.set('userName', name, { expires: 1 })
      showNotification({
        title: 'Sucesso',
        message: 'Seu login foi realizado com sucesso',
      })
    } catch (error) {
      setError('senha',{
        type: "custom",
        message:"Usuário e/ou Senha Inválida"
      })
    }
  }
   
  return (
    <form  onSubmit={handleSubmit(processandoLogin)} className={styles.loginContainer}>
      <main className={styles.loginCard}>
        <p className={styles.title}>Login</p>
        <span className={styles.obs}>
          Deseja voltar para tela inicial? <Link href="/">Tela inicial</Link>
        </span>
      
        <TextInput label="E-mail" size="md"  {...register('email')} error={errors.email?.message}/>
        <PasswordInput label="Senha" size="md"  {...register('senha')} error={errors.senha?.message}/>

        <Button color="blue" size="md" type="submit">
          Entrar
        </Button>
        <span className={styles.obs}>
          Não possui uma conta ? <Link href="/register">Registrar</Link>
        </span>
       
      </main>
    </form>
  );
};

export default Login;
