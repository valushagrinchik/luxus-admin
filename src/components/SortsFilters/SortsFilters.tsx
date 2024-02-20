import { BinIcon } from "../../controls/icons/BinIcon";
import { ExcelIcon } from "../../controls/icons/ExcelIcon";
import { Button } from "../../controls/Button/Button";
import {
  SortListGroup,
  SortsFiltersCreateOptions,
  SortsFiltersGroupByMap,
  SortsFiltersSearchByMap,
} from "../../lib/constants";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectSelectedSorts,
  setSearch,
} from "../../redux/reducer/catalogReducer";
import { Dropdown } from "../../controls/Dropdown";
import { SearchIcon } from "../../controls/icons/SearchIcon";
import { TextField } from "../../controls/TextField";
import styles from "./SortsFilters.module.css";
import { useState } from "react";

interface SortsFiltersProps {
  onSortListGroupChange: (value: SortListGroup) => void;
  onCreateBtnClick: (type: SortListGroup) => void;
  onDeleteBtnClick: () => void;
}

export const SortsFilters = ({
  onSortListGroupChange,
  onCreateBtnClick,
  onDeleteBtnClick,
}: SortsFiltersProps) => {
  const appDispatch = useAppDispatch();
  const selectedSorts = useAppSelector(selectSelectedSorts);

  // workaround to display text field select placeholder
  const [groupBy, setGroupBy] = useState("");

  // workaround to display text field select placeholder
  const [searchBy, setSearchBy] = useState("");

  return (
    <div className={styles.filter_row}>
      <TextField
        select
        style={{ width: "210px" }}
        options={SortsFiltersGroupByMap}
        value={groupBy}
        placeholder="Agrupar"
        onChange={(event) => {
          setGroupBy(event.target.value as SortListGroup);
          onSortListGroupChange(event.target.value as SortListGroup);
        }}
      />

      <div className={styles.right_group}>
        <div className={styles.search_group}>
          <TextField
            style={{ width: "200px" }}
            placeholder="Encontrar..."
            defaultValue=""
            onChange={(e) => {
              appDispatch(setSearch({ search: e.target.value }));
            }}
            icon={<SearchIcon color="var(--Gray-400)" />}
          />

          <TextField
            value={searchBy}
            select
            style={{ width: "160px" }}
            options={SortsFiltersSearchByMap}
            placeholder="Por variedad"
            onChange={(event) => {
              setSearchBy(event.target.value as SortListGroup);
              appDispatch(
                setSearch({ type: event.target.value as SortListGroup })
              );
            }}
          />
        </div>

        <Dropdown
          options={SortsFiltersCreateOptions}
          onChange={(value) => {
            onCreateBtnClick(value as SortListGroup);
          }}
        />

        <Button
          color="red"
          disabled={!selectedSorts.length}
          onClick={onDeleteBtnClick}
          style={{ padding: "10px", height: "36px" }}
        >
          <BinIcon
            color={
              !selectedSorts.length ? "var(--Gray-400)" : "var(--Base-White)"
            }
          />
        </Button>
        <Button color="transparent" style={{ padding: "8px", height: "36px" }}>
          <ExcelIcon width={24} height={24} color="var(--Primary-800)" />
        </Button>
      </div>
    </div>
  );
};
