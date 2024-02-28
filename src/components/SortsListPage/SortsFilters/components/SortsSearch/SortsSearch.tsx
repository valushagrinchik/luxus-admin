import { useState } from "react";
import { TextField } from "../../../../../controls/TextField";
import { SearchIcon } from "../../../../../controls/icons/SearchIcon";
import {
  SortListGroup,
  SortsFiltersSearchByMap,
} from "../../../../../lib/constants";
import { setSortsSearch } from "../../../../../redux/reducer/catalogReducer";
import { useAppDispatch } from "../../../../../redux/store";

export const SortsSearch = () => {
  const appDispatch = useAppDispatch();

  // workaround to display text field select placeholder
  const [searchBy, setSearchBy] = useState("");
  return (
    <div style={{ display: "flex" }}>
      <TextField
        style={{ width: "200px" }}
        placeholder="Encontrar..."
        defaultValue=""
        onChange={(e) => {
          appDispatch(setSortsSearch({ search: e.target.value }));
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
          appDispatch(setSortsSearch({ type: event.target.value as SortListGroup }));
        }}
      />
    </div>
  );
};
