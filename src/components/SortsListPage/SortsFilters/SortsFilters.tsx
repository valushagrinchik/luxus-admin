import {
  SortListGroup,
  SortsFiltersCreateOptions,
} from "../../../lib/constants";
import { useAppSelector } from "../../../redux/store";
import {
  selectSortsListTotal,
  selectSortsSearch,
} from "../../../redux/reducer/catalogReducer";
import { Dropdown } from "../../../controls/Dropdown";
import { memo } from "react";
import { ExcelDownloadBtn } from "../../../controls/DownloadBtn";
import { isEmpty, omitBy } from "lodash";
import { DeleteSelectedSortsBtn } from "./components/DeleteSelectedSortsBtn/DeleteSelectedSortsBtn";
import { SortsSearch } from "./components/SortsSearch/SortsSearch";
import { SortsGroupBy } from "./components/SortsGroupBy/SortsGroupBy";
import styles from "./SortsFilters.module.css";

interface SortsFiltersProps {
  onCreateBtnClick: (type: SortListGroup) => void;
}

const SortsFiltersRaw = ({ onCreateBtnClick }: SortsFiltersProps) => {
  const search = useAppSelector(selectSortsSearch);
  const total = useAppSelector(selectSortsListTotal);

  return (
    <div className={styles.filter_row}>
      <SortsGroupBy />
      <div className={styles.right_group}>
        <SortsSearch />
        <Dropdown
          options={SortsFiltersCreateOptions}
          onChange={onCreateBtnClick}
        />
        <DeleteSelectedSortsBtn />
        <ExcelDownloadBtn
          disabled={!total}
          url={
            "/api/groups/excel?" + new URLSearchParams(omitBy(search, isEmpty))
          }
          prefix="sorts"
        />
      </div>
    </div>
  );
};

export const SortsFilters = memo(SortsFiltersRaw);
