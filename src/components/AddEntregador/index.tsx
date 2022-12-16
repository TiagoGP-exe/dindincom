import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, TextInput } from "@mantine/core";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IEntregador, IEntregadorType } from "../../services/entregadorService";
import styles from "./styles.module.css";

import InputMask from "react-input-mask";
import { formattedCpf } from "../../utils/formatter";

const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  cpf: yup
    .string()
    .required("Campo obrigatório")
    .test({
      test: (obj, ctx) => {
        const cpf = obj?.replace(/\D/g, "");

        if (cpf?.length === 11) {
          return true;
        }
        return ctx.createError({
          message: "CPF inválido",
        });
      },
    }),
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
  placa_veiculo: yup.string().required("Campo obrigatório"),
  rota: yup.string().required("Campo obrigatório"),
});

interface AddEntregadorProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  value?: IEntregador;
}

export const AddEntregador: FC<AddEntregadorProps> = ({
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
  } = useForm<IEntregador>({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: value?.nome ?? "",
      cpf: formattedCpf(value?.cpf ?? "") ?? "",
      telefone: value?.telefone ?? "",
      placa_veiculo: value?.placa_veiculo ?? "",
      rota: value?.rota ?? "",
      id_entregador: value?.id_entregador ?? undefined,
    },
  });

  const cpfValue = watch("cpf");
  const telefoneValue = watch("telefone");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.containerModal}>
      <TextInput
        {...register("nome")}
        label="Nome"
        placeholder="Nome"
        error={errors.nome?.message}
      />
      <Input.Wrapper label="CPF" error={errors.cpf?.message}>
        <Input
          {...register("cpf")}
          component={InputMask as any}
          mask="999.999.999-99"
          value={cpfValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue("cpf", e.target.value.replace(/[^A-Z0-9]+/gi, ""))
          }
          invalid={!!errors.cpf?.message}
          placeholder="Digite o CPF do entregador"
        />
      </Input.Wrapper>

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
          placeholder="Digite o seu telefone"
        />
      </Input.Wrapper>
      <TextInput
        {...register("placa_veiculo")}
        label="Placa do veículo"
        placeholder="Digite a placa do veículo"
        error={errors.placa_veiculo?.message}
        minLength={7}
        maxLength={7}
      />

      <TextInput
        {...register("rota")}
        label="Rota"
        placeholder="Digite a rota do entregador"
        error={errors.rota?.message}
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
          Não
        </Button>
        <Button
          className={styles.Buttons}
          color="blue.6"
          type="submit"
          uppercase
        >
          sim
        </Button>
      </div>
    </form>
  );
};
