import { FC } from "react";
import { ICremosinhoSell } from "../../pages/dashboard/create";
import { ActionIcon } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import { formattedValue } from "../../utils/formatter";
import styles from "./styles.module.css";

interface CartProps {
  actualCremosinho: ICremosinhoSell[];
  addById: (id: number) => void;
  removeById: (id: number) => void;
  deleteById: (id: number) => void;
}

export const Cart: FC<CartProps> = ({
  actualCremosinho,
  addById,
  removeById,
  deleteById,
}) => {
  
  return (
    <div className={styles.containerCard}>
      <p>Resumo</p>

      {actualCremosinho?.map((element) => (
        <div className={styles.contentCard} key={element.id_cremosinho}>
          <p>{element.sabor}</p>
          <div className={styles.hStack}>
            <ActionIcon
              disabled={element.qtd === 1}
              onClick={() => removeById(element.id_cremosinho!)}
            >
              <IconMinus size={14} />
            </ActionIcon>
            <p>{element.qtd}</p>
            <ActionIcon
              disabled={element.qtd === Number(element.qtd_estoque)}
              onClick={() => addById(element.id_cremosinho!)}
            >
              <IconPlus size={14} />
            </ActionIcon>
          </div>

          <p>{formattedValue(Number(element.vlr_unitario) * element.qtd)}</p>

          <ActionIcon
            color="red"
            onClick={() => deleteById(element.id_cremosinho!)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </div>
      ))}
    </div>
  );
};
