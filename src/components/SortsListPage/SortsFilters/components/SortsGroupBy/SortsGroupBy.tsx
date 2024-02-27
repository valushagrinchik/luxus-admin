import { TextField } from "../../../../../controls/TextField";
import {
  SortListGroup,
  SortsFiltersGroupByMap,
} from "../../../../../lib/constants";
import {
  selectSortsGroupBy,
  selectSortsToggleMap,
  setSortsGroupBy,
  setSortsToggleMap,
} from "../../../../../redux/reducer/catalogReducer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";

export const SortsGroupBy = () => {
  const appDispatch = useAppDispatch();
  const groupBy = useAppSelector(selectSortsGroupBy);
  const sortsToggleMap = useAppSelector(selectSortsToggleMap);

  const calculateSortsToggleMap = (groupBy: string) => {
    return Object.fromEntries(
      Object.entries(sortsToggleMap).map(([key, value]) => {
        if (key.startsWith("group")) {
          return [key, groupBy !== "group"];
        }
        if (key.startsWith("category")) {
          return [key, groupBy !== "category" && groupBy !== "group"];
        }
        return [key, value];
      })
    );
  };

  return (
    <TextField
      select
      style={{ width: "210px" }}
      options={SortsFiltersGroupByMap}
      value={groupBy || ""}
      placeholder="Agrupar"
      onChange={(event) => {
        appDispatch(
          setSortsToggleMap(calculateSortsToggleMap(event.target.value))
        );

        appDispatch(setSortsGroupBy(event.target.value as SortListGroup));
      }}
    />
  );
};
