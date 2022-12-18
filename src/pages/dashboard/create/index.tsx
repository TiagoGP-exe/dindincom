import { Button, Checkbox, Header, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/pt";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Cart } from "../../../components/Cart";
import { ListAllCremosinho } from "../../../components/ListAllCremosinho";
import { ICremosinho } from "../../../services/cremosinhoService";
import { getEntregador } from "../../../services/entregadorService";
import { formattedValue } from "../../../utils/formatter";
import styles from "./styles.module.css";

export interface ICremosinhoSell extends ICremosinho {
  qtd: number;
}

interface ILabeledValue {
  label: string;
  value: string;
}

interface DashboardProps {
  allEntregador: ILabeledValue[];
}

interface IForm {
  vlr_total_venda: string;
  dt_venda: string;
  entregador: "s" | "n";
  dt_entrega: string;
  pago: "s" | "n";
  id_forma_pagamento: number;
  id_entregador: number;
  id_status: number;
}

const Dashboard: FC<DashboardProps> = ({ allEntregador }) => {
  const [cremosinho, setCremosinho] = useState<ICremosinhoSell[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IForm>({});

  const addCremosinho = (cremosinho: ICremosinho) =>
    setCremosinho((oldCremosinho) => [
      ...oldCremosinho,
      { ...cremosinho, qtd: 1 },
    ]);

  const addById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.map((element) =>
        element.id_cremosinho === id
          ? { ...element, qtd: element.qtd + 1 }
          : element
      )
    );

  const removeById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.map((element) =>
        element.id_cremosinho === id
          ? { ...element, qtd: element.qtd - 1 }
          : element
      )
    );

  const deleteById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.filter((element) => element.id_cremosinho !== id)
    );

  const total = cremosinho.reduce(
    (acc, element) => acc + element.qtd * Number(element.vlr_unitario),
    0
  );

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  const entregador = watch("entregador");
  const idEntregador = watch("id_entregador");

  const pago = watch("pago");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header className={styles.header} bg="blue.6" height={80}>
        <Link className={styles.active} href={"/dashboard"}>
          Venda
        </Link>
        <Link href={"/dashboard/deliveryman"}>Entregador</Link>
        <Link href={"/dashboard/product"}>Produtos</Link>
        <Link href={"/"}>Sair</Link>
      </Header>

      <div className={styles.container}>
        <main className={styles.containerSell}>
          <div className={styles.contentCart}>
            <Checkbox
              value={pago}
              onChange={(e) => setValue("pago", e.target.checked ? "s" : "n")}
              label="Pago"
            />
            <div className={styles.hStack}>
              <Checkbox
                value={entregador}
                onChange={(e) =>
                  setValue("entregador", e.target.checked ? "s" : "n")
                }
                label="Entrega"
              />
              {entregador === "s" && (
                <>
                  <Select
                    label="Entregador"
                    placeholder="Selecione um entregador"
                    data={allEntregador}
                    value={String(idEntregador)}
                    onChange={(e) =>
                      e !== null && setValue("id_entregador", Number(e))
                    }
                  />
                  <DatePicker
                    locale="pt-br"
                    firstDayOfWeek="sunday"
                    placeholder="Data da entrega"
                    onChange={(date) =>
                      date !== null &&
                      setValue("dt_entrega", date.toISOString())
                    }
                    label="Data da entrega"
                  />
                </>
              )}
            </div>
            <Cart
              actualCremosinho={cremosinho}
              addById={addById}
              removeById={removeById}
              deleteById={deleteById}
            />
          </div>
          <div>
            <ListAllCremosinho
              actualCremosinho={cremosinho}
              addCremosinho={addCremosinho}
            />
            <div className={styles.mt}>
              <p>Total:</p>
              <p>{formattedValue(total)}</p>
            </div>

            <Button type="submit" disabled={total === 0} fullWidth mt={20}>
              Finalizar
            </Button>
          </div>
        </main>
      </div>
    </form>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const response = await getEntregador();

    const formattedResponse = response.map((entregador) => ({
      label: entregador.nome,
      value: String(entregador.id_entregador),
    }));

    return {
      props: {
        allEntregador: formattedResponse,
      },
    };
  } catch {
    return {
      props: {
        allEntregador: [],
      },
    };
  }
}

export default Dashboard;
