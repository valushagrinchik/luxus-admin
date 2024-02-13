import Drawer from "@mui/material/Drawer";
import { Link, useLocation } from "react-router-dom";
import { ListIcon } from "../../controls/icons/ListIcon";
import { CoinsIcon } from "../../controls/icons/CoinsIcon";
import { PeopleIcon } from "../../controls/icons/PeopleIcon";
import { MenuItem } from "../../lib/types";

import styles from "./Sidebar.module.css";
import { DropdownMenu } from "../../controls/DropdownMenu/DropdownMenu";
import { Button } from "../../controls/Button/Button";
import { useAuth } from "../../lib/auth";
import { SignOutIcon } from "../../controls/icons/SignOutIcon";
import classNames from "classnames";

export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { signout } = useAuth();
  const { pathname } = useLocation();
  const menu: MenuItem[] = [
    {
      link: "",
      icon: <ListIcon color="#155EEF" />,
      label: "Catálogos",
      children: [
        {
          link: "/sorts",
          label: "Variedades",
        },
        {
          link: "/plantations",
          label: "Fincas",
        },
        {
          link: "/clients",
          label: "Clientes",
        },
      ],
    },
    {
      link: "",
      icon: <CoinsIcon color="#155EEF" />,
      label: "Fincas",
    },
    {
      link: "",
      icon: <PeopleIcon color="#155EEF" />,
      label: "Clientes",
    },
  ];
  return (
    <div>
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          style: {
            top: "48px",
            boxShadow: "none",
          },
        }}
        slotProps={{
          root: {
            style: {
              top: "48px",
            },
          },
          backdrop: {
            style: {
              backgroundColor: "transparent",
            },
          },
        }}
      >
        <div className={styles.menu}>
          {menu.map((item, index) => {
            if (item.children?.length) {
              const parentItem = (
                <span className={styles.menu_item}>
                  {item.icon}
                  {item.label}
                </span>
              );
              const innerItems = (
                <div className={styles.inner_items}>
                  {item.children.map((item, index) => (
                    <Link
                      onClick={onClose}
                      key={index}
                      to={item.link}
                      className={classNames({
                        [styles.active]: pathname === item.link,
                      })}
                    >
                      <span className={classNames(styles.menu_item)}>
                        {item.icon}
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              );
              return (
                <DropdownMenu
                  key={index}
                  title={parentItem}
                  content={innerItems}
                />
              );
            } else {
              return (
                <Link key={index} to={item.link} onClick={onClose}>
                  <span className={styles.menu_item}>
                    {item.icon}
                    {item.label}
                  </span>
                </Link>
              );
            }
          })}

          <Button
            className={styles.signout_btn}
            appearance="transparent"
            onClick={async () => {
              await signout();
            }}
          >
            <SignOutIcon />
            Cierre de sesión
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
