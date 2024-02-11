import React from "react";
import { Select } from "../../controls/Select";
import { BaseInput } from "../../controls/BaseInput";
import styles from "./SortsFilters.module.css";
import { Button } from "@mui/base/Button";
import { PlusIcon } from "../../controls/icons/PlusIcon";
import { BinIcon } from "../../controls/icons/BinIcon";
import { ExcelIcon } from "../../controls/icons/ExcelIcon";

export const SortsFilters = () => {
  const groupOptions = [
    {
      label: "Ocultar todo",
      value: "showGroups",
    },
    {
      label: "Mostrar hasta categorias",
      value: "showCategories",
    },
    {
      label: "Mostrar todo",
      value: "showSorts",
    },
  ];

  const searchOptions = [
    {
      label: "Por variedad ",
      value: "sort",
    },
    {
      label: "Por categoria",
      value: "category",
    },
    {
      label: "Por grupo",
      value: "group",
    },
  ];

  return (
    <div className={styles.filter_row}>
      <Select options={groupOptions} placeholder="Agrupar" />

      <div className={styles.right_group}>
        <div className={styles.search_group}>
          <BaseInput placeholder="Encontrar..." />
          <Select options={searchOptions} placeholder="Por variedad" />
        </div>

        <Button className="ok_btn">
          <PlusIcon />
          Crear
        </Button>
        <Button className="ok_btn" disabled>
          <BinIcon />
        </Button>

        <ExcelIcon />
      </div>
    </div>
  );
};
