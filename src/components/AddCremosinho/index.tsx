import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { ICremosinho } from "../../services/cremosinhoService";
import styles from "./styles.module.css";
import * as yup from "yup";
import { FC } from "react";
import { formattedValue } from "../../utils/formatter";

const schema = yup.object().shape({
  sabor: yup.string().required("Campo obrigatório"),
  vlr_unitario: yup.string().required("Campo obrigatório"),
  qtd_estoque: yup.number().required("Campo obrigatório").min(1, "Mínimo 1"),
});

interface AddCremosinhoProps {
  onSubmit: (data: ICremosinho) => void;
  onClose: () => void;
  value?:ICremosinho;
}

export const AddCremosinho: FC<AddCremosinhoProps> = ({
  onClose,
  onSubmit,
  value
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ICremosinho>({
    resolver: yupResolver(schema),
    defaultValues: {
      sabor: value?.sabor??"",
      vlr_unitario: value?.vlr_unitario??"R$ 0,00",
      qtd_estoque: value?.qtd_estoque??0,
      inativo: value?.inativo ?? "f",
      id_cremosinho: value?.id_cremosinho,
    },
  });

 const isInativo = watch('inativo') == 'v' ? true : false;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.containerModal}>
      <TextInput
        {...register("sabor")}
        label="Sabor"
        placeholder="Sabor"
        error={errors.sabor?.message}
      />
      <TextInput
        {...register("vlr_unitario")}
        label="Preço"
        placeholder="Preço"
        onChange={(e)=>{
          const value  = e.target.value.replace(/\D/g,"");

          setValue(
            "vlr_unitario",
            e.target.value ? formattedValue(value) : "R$ 0,00"
          )
        }}
        error={errors.vlr_unitario?.message}
      />
      <TextInput
        {...register("qtd_estoque")}
        label="Quantidade"
        type="number"
        onChange={(e) =>
          setValue("qtd_estoque", e.target.value ? Number(e.target.value) : 0)
        }
        placeholder="Quantidade"
        error={errors.qtd_estoque?.message}
      />

      {
        value?.id_cremosinho && (
          <Checkbox
          checked={isInativo}
          {...register("inativo")}
          label="Inativo"
          />
        )
      }

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
