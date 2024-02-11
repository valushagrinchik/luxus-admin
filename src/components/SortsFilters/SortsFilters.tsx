import React from "react";
import { Select } from "../../controls/Select";
import { BaseInput } from "../../controls/BaseInput";
import styles from "./SortsFilters.module.css";
import { Button } from "@mui/base/Button";
import { PlusIcon } from "../../controls/icons/PlusIcon";
import { BinIcon } from "../../controls/icons/BinIcon";
import { ExcelIcon } from "../../controls/icons/ExcelIcon";
import { SortListGroup } from "../SortsList/SortsList";

interface SortsFiltersProps {
  onSortListGroupChange: (value: SortListGroup) => void
}
export const SortsFilters = ({
  onSortListGroupChange
}: SortsFiltersProps) => {
  const groupOptions = [
    {
      label: "Ocultar todo",
      value: SortListGroup.group,
    },
    {
      label: "Mostrar hasta categorias",
      value: SortListGroup.category,
    },
    {
      label: "Mostrar todo",
      value: SortListGroup.sort,
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
      <Select defaultValue={groupOptions[0].value} options={groupOptions} multiple={false} placeholder="Agrupar" onChange={(e, value)=>onSortListGroupChange(value as SortListGroup)}/>

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
