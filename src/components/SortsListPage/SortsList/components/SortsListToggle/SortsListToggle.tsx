import { ArrowDownSmallIcon } from "../../../../../controls/icons/ArrowDownSmallIcon";
import { ArrowRightSortsIcon } from "../../../../../controls/icons/ArrowRightSortsIcon";
import {
  selectSortsToggleMap,
  setSortsToggleMap,
} from "../../../../../redux/reducer/catalogReducer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";

export const SortsListToggle = ({ isOpenKey }: { isOpenKey: string }) => {
  const appDispatch = useAppDispatch();
  const isOpen = useAppSelector(selectSortsToggleMap)[isOpenKey];

  return (
    <span
      onClick={() => {
        appDispatch(setSortsToggleMap({ [isOpenKey]: !isOpen }));
      }}
    >
      {isOpen ? (
        <ArrowDownSmallIcon color="#0040C1" />
      ) : (
        <ArrowRightSortsIcon color="var(--Gray-900)" />
      )}
    </span>
  );
};
