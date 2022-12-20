import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, PasswordInput, TextInput } from "@mantine/core";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IUsuario, IUsuarioType } from "../../services/usuarioService";
import styles from "./styles.module.css";

import InputMask from "react-input-mask";


const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  
  telefone: yup
    .string()
    .required("Campo obrigatório")
    .test({
      test: (obj, ctx) => {
        const telefone = obj?.replace(/\D/g, "");

        if (telefone && telefone?.length <= 11) {
          console.log(telefone?.length);
          return true;
        }

        return ctx.createError({
          message: "Telefone inválido",
        });
      },
    }),
 endereco: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  senha: yup.string().required("Campo obrigatório"),
});

interface AddUsuarioProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  value?: IUsuario;
}

export const AddUsuario: FC<AddUsuarioProps> = ({
  onClose,
  onSubmit,
  value,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IUsuario>({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: value?.nome ?? "",
      telefone: value?.telefone ?? "",
     endereco: value?.endereco ?? "",
      email: value?.email ?? "",
      id_usuario: value?.id_usuario ?? undefined,
    },
  });


  const telefoneValue = watch("telefone");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.containerModal}>
      <TextInput
        {...register("nome")}
        label="Nome"
        placeholder="Nome"
        error={errors.nome?.message}
      />
      

      <Input.Wrapper label="Telefone" error={errors.telefone?.message}>
        <Input
          {...register("telefone")}
          component={InputMask as any}
          mask="(99) 99999-9999"
          value={telefoneValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue("telefone", e.target.value.replace(/[^A-Z0-9]+/gi, ""))
          }
          invalid={!!errors.telefone?.message}
          placeholder="Digite o telefone do usuário"
        />
      </Input.Wrapper>
      <TextInput
        {...register("endereco")}
        label="Endereço"
        placeholder="Digite o endereço do usuário"
        error={errors.endereco?.message}
      
      />

      <TextInput
        {...register("email")}
        label="Email"
        placeholder="Digite a email do usuário"
        error={errors.email?.message}
        maxLength={20}
      />
        <PasswordInput
        {...register("senha")}
        label="Senha"
        placeholder="Digite a senha do Usuario"
        error={errors.senha?.message}
        maxLength={20}
      />

      <div className={styles.ContainerButtons}>
        <Button
          className={styles.Buttons}
          color="blue.6"
          variant="outline"
          onClick={onClose}
          uppercase
        >
          Cancelar
        </Button>
        <Button
          className={styles.Buttons}
          color="blue.6"
          type="submit"
          uppercase
        >
          Gravar
        </Button>
      </div>
    </form>
  );
};
