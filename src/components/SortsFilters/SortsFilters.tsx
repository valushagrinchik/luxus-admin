import { Select } from "../../controls/Select";
import { BaseInput } from "../../controls/BaseInput";
import { BinIcon } from "../../controls/icons/BinIcon";
import { ExcelIcon } from "../../controls/icons/ExcelIcon";
import { Button } from "../../controls/Button/Button";
import {
  SortListGroup,
  SortsFiltersCreateOptions,
  SortsFiltersGroupByOptions,
  SortsFiltersSearchByOptions,
} from "../../lib/constants";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectSelectedSorts,
  selectSortsSearch,
  setSearch,
} from "../../redux/reducer/catalogReducer";
import React from "react";
import { prepareForSlot } from "@mui/base/utils";

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
  const search = useAppSelector(selectSortsSearch);
  const selectedSorts = useAppSelector(selectSelectedSorts);

  return (
    <div className={styles.filter_row}>
      <Select
        style={{ minWidth: 250 }}
        slotProps={{
          root: {
            className: styles.input_width,
          },
          listbox: {
            className: styles.input_width,
          },
        }}
        options={SortsFiltersGroupByOptions}
        multiple={false}
        placeholder="Agrupar"
        onChange={(e, value) => onSortListGroupChange(value as SortListGroup)}
      />

      <div className={styles.right_group}>
        <div className={styles.search_group}>
          <BaseInput
            placeholder="Encontrar..."
            onChange={(e) => {
              appDispatch(setSearch({ search: (e?.target as any)?.value }));
            }}
          />
          <Select
            defaultValue={search.type}
            options={SortsFiltersSearchByOptions}
            multiple={false}
            placeholder="Por variedad"
            onChange={(e, value) => {
              appDispatch(setSearch({ type: value as SortListGroup }));
            }}
          />
        </div>

        <Select
          slots={{
            root: prepareForSlot(
              React.forwardRef(function MyButton(
                props: any,
                ref: React.ForwardedRef<HTMLButtonElement>
              ) {
                return (
                  <Button {...props} ref={ref} appearance="add">
                    Crear
                  </Button>
                );
              })
            ),
          }}
          options={SortsFiltersCreateOptions}
          dropdown="menu"
          multiple={false}
          onChange={(e, value) => {
            onCreateBtnClick(value as SortListGroup);
          }}
        />

        <Button
          appearance="base"
          disabled={!selectedSorts.length}
          icon={<BinIcon />}
          onClick={() => onDeleteBtnClick()}
        />
        <Button appearance="base" disabled icon={<ExcelIcon />} />
      </div>
    </div>
  );
};
