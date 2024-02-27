import { ResourceEvent } from "../../../hooks/useWS";
import { SortListGroup } from "../../../lib/constants";
import { Category, Group, ListActionType, Sort } from "../../../lib/types";

export type SortsListProps = {
  openModal: (
    action: ListActionType,
    type: SortListGroup,
    data: Group | Category | Sort
  ) => void;
  data: Group[];
  emitEvent: (action: ResourceEvent) => void;
};

export type SortsListFetchDataProps = Omit<SortsListProps, "data"> & {
  refetch?: boolean;
  limit: number;
  page: number;
};

export type SortsListPaginatedProps = Omit<SortsListProps, "data"> & {
  refetch?: boolean;
  limit?: number;
};
