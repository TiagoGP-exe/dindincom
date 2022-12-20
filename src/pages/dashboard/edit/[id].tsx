import "dayjs/locale/pt";
import { Button, Checkbox, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { GetServerSidePropsContext } from "next";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Cart } from "../../../components/Cart";
import { HeaderDashboard } from "../../../components/HeaderDashboard";
import { ListAllCremosinho } from "../../../components/ListAllCremosinho";
import { ICremosinho } from "../../../services/cremosinhoService";
import { getEntregador } from "../../../services/entregadorService";
import { getFormaDePagamento } from "../../../services/formaDePagamentoService";
import { getStatus } from "../../../services/statusService";
import { formattedValue } from "../../../utils/formatter";
import styles from "./styles.module.css";
import { getUsuario } from "../../../services/usuarioService";
import { postVenda, putVenda } from "../../../services/vendaService";
import { useRouter } from "next/router";

export interface ICremosinhoSell extends ICremosinho {
  qtd: number;
}

interface ILabeledValue {
  label: string;
  value: string;
}

interface DashboardProps {
  allEntregador: ILabeledValue[];
  allFormaDePagamento: ILabeledValue[];
  allStatus: ILabeledValue[];
  allUsuario: ILabeledValue[];
  id: number;
}

interface IForm {
  vlr_total_venda: string;
  dt_venda: string;
  entregador: "s" | "n";
  dt_entrega: string;
  pago: "s" | "n";
  itens: [any];
  id_forma_pagamento: number;
  id_entregador: number;
  id_status: number;
  id_usuario: number;
}

const Dashboard: FC<DashboardProps> = ({
  allEntregador,
  allFormaDePagamento,
  allStatus,
  allUsuario,
  id,
}) => {
  const [cremosinho, setCremosinho] = useState<ICremosinhoSell[]>([]);
  const router = useRouter();
  const {
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

  const onSubmit = async (data: IForm) => {
    const resultPerItem = cremosinho.map((item) => ({
      ...item,
      valor: Number(item.vlr_unitario) * item.qtd,
    }));
    const formattedData = {
      ...data,
      itens: resultPerItem,
      total,
      id_venda: id,
    };
    try {
      await putVenda(formattedData as any);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const entregador = watch("entregador");
  const idEntregador = watch("id_entregador");
  const idFormaDePagamento = watch("id_forma_pagamento");
  const idStatus = watch("id_status");
  const idUsuario = watch("id_usuario");

  const pago = watch("pago");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderDashboard />

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
            <Select
              label="Cliente"
              placeholder="Selecione um cliente"
              data={allUsuario}
              value={String(idUsuario)}
              onChange={(e) => e !== null && setValue("id_usuario", Number(e))}
            />
            <Select
              label="Forma de Pagamento"
              placeholder="Selecione uma forma"
              data={allFormaDePagamento}
              value={String(idFormaDePagamento)}
              onChange={(e) =>
                e !== null && setValue("id_forma_pagamento", Number(e))
              }
            />
            <Select
              label="Status da Venda"
              placeholder="Selecione um status"
              data={allStatus}
              value={String(idStatus)}
              onChange={(e) => e !== null && setValue("id_status", Number(e))}
            />

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
  const { id } = ctx.query;

  try {
    const result = await Promise.all([
      getEntregador(),
      getFormaDePagamento(),
      getStatus(),
      getUsuario(),
    ]);

    const formattedEntregadorResponse = result[0].map((entregador) => ({
      label: entregador.nome,
      value: String(entregador.id_entregador),
    }));
    const formattedFormaDePagamentoResponse = result[1].map((entregador) => ({
      label: entregador.descricao,
      value: String(entregador.id_forma_pagamento),
    }));

    const formattedStatusResponse = result[2].map((entregador) => ({
      label: entregador.nome,
      value: String(entregador.id_status),
    }));

    const formattedUserResponse = result[3].map((user) => ({
      label: user.nome,
      value: String(user.id_usuario),
    }));

    return {
      props: {
        allEntregador: formattedEntregadorResponse,
        allFormaDePagamento: formattedFormaDePagamentoResponse,
        allStatus: formattedStatusResponse,
        allUsuario: formattedUserResponse,
        id,
      },
    };
  } catch {
    return {
      props: {
        allEntregador: [],
        id,
      },
    };
  }
}

export default Dashboard;
