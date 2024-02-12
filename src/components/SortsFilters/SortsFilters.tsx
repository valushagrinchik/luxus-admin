import { Select } from "../../controls/Select";
import { BaseInput } from "../../controls/BaseInput";
import styles from "./SortsFilters.module.css";
import { BinIcon } from "../../controls/icons/BinIcon";
import { ExcelIcon } from "../../controls/icons/ExcelIcon";
import { Button } from "../../controls/Button/Button";
import { SortListGroup } from "../../lib/constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { CatalogState, selectSortsSearch, setSearch } from "../../redux/reducer/catalogReducer";

interface SortsFiltersProps {
  onSortListGroupChange: (value: SortListGroup) => void
}
export const SortsFilters = ({
  onSortListGroupChange,
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

        <Button appearance="add">
          Crear
        </Button>
        <Button appearance="base" disabled icon={<BinIcon />}/>
        <Button appearance="base" disabled icon={<ExcelIcon />}/>
      </div>
    </div>
  );
};
