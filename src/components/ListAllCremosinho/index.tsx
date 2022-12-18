import { TextInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { ICremosinho, getCremosinho } from "../../services/cremosinhoService";
import styles from "./styles.module.css";
import { IconSearch } from "@tabler/icons";
import { formattedValue } from "../../utils/formatter";

interface ListAllCremosinhoProps {
  actualCremosinho: ICremosinho[];
  addCremosinho: (ICremosinho: ICremosinho) => void;
}

export const ListAllCremosinho: FC<ListAllCremosinhoProps> = ({
  actualCremosinho,
  addCremosinho,
}) => {
  const [cremosinho, setCremosinho] = useState<ICremosinho[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const response = await getCremosinho();
        setCremosinho(response);
      } catch (error) {}
    })();
  }, []);

  const filterValue = filter
    ? cremosinho.filter((element) =>
        element.sabor.toLowerCase().includes(filter.toLowerCase())
      )
    : cremosinho;

  return (
    <div className={styles.containerAllCremosinho}>
      <TextInput
        label="Sabor"
        placeholder="Sabor"
        value={filter}
        onChange={(event) => setFilter(event.currentTarget.value)}
        icon={<IconSearch size={16} />}
      />

      <main className={styles.contentAllCremosinho}>
        {filterValue.length ? (
          filterValue.map((element) => {
            const isActive = actualCremosinho.some(
              (actual) => actual.id_cremosinho === element.id_cremosinho
            );

            return (
              <div
                onClick={() => !isActive && addCremosinho(element)}
                className={`${styles.itemAllCremosinho} ${
                  isActive ? styles.active : ""
                }`}
                key={element.id_cremosinho}
              >
                <p>{element.sabor}</p>
                <p>{formattedValue(element.vlr_unitario)}</p>
              </div>
            );
          })
        ) : (
          <span className={styles.fontXS}>Nenhum sabor encontrado</span>
        )}
      </main>
    </div>
  );
};
