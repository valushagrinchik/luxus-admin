import { Select } from "../../controls/Select";
import { BaseInput } from "../../controls/BaseInput";
import styles from "./SortsFilters.module.css";
import { BinIcon } from "../../controls/icons/BinIcon";
import { ExcelIcon } from "../../controls/icons/ExcelIcon";
import { Button } from "../../controls/Button/Button";
import { SortListGroup } from "../../lib/constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { CatalogState, selectSortsSearch, setSearch } from "../../redux/reducer/catalogReducer";
import React from "react";
import { prepareForSlot } from "@mui/base/utils";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { MenuButton } from "@mui/base/MenuButton";

interface SortsFiltersProps {
  onSortListGroupChange: (value: SortListGroup) => void
  onCreateBtnClick: (type: SortListGroup) => void
}

export const SortsFilters = ({
  onSortListGroupChange,
  onCreateBtnClick
}: SortsFiltersProps) => {
  const appDispatch = useAppDispatch();
  const search: CatalogState["sortsSearch"] = useAppSelector(selectSortsSearch)


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

  const createOptions = [
    {
      label: "Crear grupo",
      value:  SortListGroup.group
    },
    {
      label: "Crear categoria",
      value:  SortListGroup.category
    },
    {
      label: "Crear variedad",
      value: SortListGroup.sort
    },
  ]

  return (
    <div className={styles.filter_row}>
      <Select defaultValue={groupOptions[0].value} options={groupOptions} multiple={false} placeholder="Agrupar" onChange={(e, value)=>onSortListGroupChange(value as SortListGroup)}/>

      <div className={styles.right_group}>
        <div className={styles.search_group}>
          <BaseInput placeholder="Encontrar..." onChange={(e) => {
            appDispatch(setSearch({search: (e?.target as any)?.value}))
          }}/>
          <Select 
            defaultValue={search.type} 
            options={searchOptions}  
            multiple={false} 
            placeholder="Por variedad" 
            onChange={(e, value) => {
              appDispatch(setSearch({type: value as SortListGroup}))
            }}/>
        </div>


        <Select 
          slots={{ root: prepareForSlot(React.forwardRef(function MyButton(
            props: any,
            ref: React.ForwardedRef<HTMLButtonElement>
          ) {
            return <Button {...props} ref={ref} appearance="add">
              Crear
            </Button>
          }))}}
          options={createOptions}  
          dropdown="menu"
          multiple={false} 
          onChange={(e, value) => {
            onCreateBtnClick(value as SortListGroup)
          }}/>


        <Button appearance="base" disabled icon={<BinIcon />}/>
        <Button appearance="base" disabled icon={<ExcelIcon />}/>
      </div>
    </div>
  );
};
