import { Header } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const listOfLinks = [
  {
    href: "/dashboard",
    label: "Venda",
  },
  {
    href: "/dashboard/deliveryman",
    label: "Entregador",
  },
  {
    href: "/dashboard/product",
    label: "Produtos",
  },
  {
    href: "/dashboard/user",
    label: "Usuario",
  },
  {
    href: "/",
    label: "Sair",
  },
];

export const HeaderDashboard = () => {
  const { pathname } = useRouter();

  return (
    <Header className={styles.header} bg="blue.6" height={80}>
      {listOfLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? styles.active : ""}
        >
          {link.label}
        </Link>
      ))}
    </Header>
  );
};
