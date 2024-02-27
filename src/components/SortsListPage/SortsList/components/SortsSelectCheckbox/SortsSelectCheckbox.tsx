import { uniq } from "lodash";
import { Checkbox } from "../../../../../controls/Checkbox";
import {
  selectSelectedSorts,
  setSelectedSorts,
} from "../../../../../redux/reducer/catalogReducer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";

export const SortsSelectCheckbox = ({ id }: { id: number }) => {
  const appDispatch = useAppDispatch();

  const selectedSorts = useAppSelector(selectSelectedSorts);

  return (
    <Checkbox
      checked={selectedSorts.includes(id)}
      onChange={(e, checked) => {
        if (checked) {
          appDispatch(setSelectedSorts(uniq(selectedSorts.concat(id))));
        } else {
          appDispatch(
            setSelectedSorts([
              ...selectedSorts.filter((selected) => selected !== id),
            ])
          );
        }
      }}
    />
  );
};
