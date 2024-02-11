import { Select } from "../../controls/Select";
import { BaseInput } from "../../controls/BaseInput";
import styles from "./SortsFilters.module.css";
import { BinIcon } from "../../controls/icons/BinIcon";
import { ExcelIcon } from "../../controls/icons/ExcelIcon";
import { SortListGroup } from "../SortsList/SortsList";
import { Button } from "../../controls/Button/Button";
import { useState } from "react";

interface SortsFiltersProps {
  onSortListGroupChange: (value: SortListGroup) => void
  onSearchChange: (value: any) => void
}
export const SortsFilters = ({
  onSortListGroupChange,
  onSearchChange
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
      value: SortListGroup.sort
    },
    {
      label: "Por categoria",
      value:  SortListGroup.category
    },
    {
      label: "Por grupo",
      value:  SortListGroup.group
    },
  ];

  const [search, setSearch] = useState<{search?: string , type: SortListGroup}>({type: SortListGroup.group })

  return (
    <div className={styles.filter_row}>
      <Select defaultValue={groupOptions[0].value} options={groupOptions} multiple={false} placeholder="Agrupar" onChange={(e, value)=>onSortListGroupChange(value as SortListGroup)}/>

      <div className={styles.right_group}>
        <div className={styles.search_group}>
          <BaseInput placeholder="Encontrar..." onChange={(e) => {
            const state = {...search, search: (e?.target as any)?.value}
            setSearch(state)
            onSearchChange(state)
          }}/>
          <Select 
            defaultValue={search.type} 
            options={searchOptions}  
            multiple={false} 
            placeholder="Por variedad" 
            onChange={(e) => {
              const state = {...search, type:(e?.target as any)?.value}
              setSearch(state)
              onSearchChange(state)
            }}/>
        </div>

        <Button appearance="add">
          Crear
        </Button>
        <Button appearance="base" disabled icon={<BinIcon />}/>
        <Button appearance="base" disabled icon={<ExcelIcon />}/>
      </div>
    </div>
  );
};
