import { Select } from "../../controls/Select";
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

  return (
    <div className={styles.filter_row}>
      <Select
        style={{ width: "210px" }}
        options={SortsFiltersGroupByMap}
        placeholder="Agrupar"
        onChange={(event) => {
          onSortListGroupChange(event.target.value as SortListGroup);
        }}
      />

      <div className={styles.right_group}>
        <div className={styles.search_group}>
          <TextField
            style={{ width: "200px" }}
            placeholder="Encontrar..."
            onChange={(e) => {
              appDispatch(setSearch({ search: e.target.value }));
            }}
            icon={<SearchIcon color="var(--Gray-400)" />}
          />

          <Select
            style={{ width: "160px" }}
            options={SortsFiltersSearchByMap}
            placeholder="Por variedad"
            onChange={(event) => {
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
          onClick={() => onDeleteBtnClick()}
        >
          <BinIcon
            color={
              !selectedSorts.length ? "var(--Gray-400)" : "var(--Base-White)"
            }
          />
        </Button>
        <Button color="transparent">
          <ExcelIcon width={24} height={24} color="var(--Primary-800)" />
        </Button>
      </div>
    </div>
  );
};
