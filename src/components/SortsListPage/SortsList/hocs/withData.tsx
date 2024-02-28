import { useEffect } from "react";
import { useSearchGroupsQuery } from "../../../../api/sortsApi";
import {
  selectSortsGroupBy,
  selectSortsSearch,
  selectSortsToggleMap,
  setSortsToggleMap,
} from "../../../../redux/reducer/catalogReducer";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { NoData } from "../../../ui/NoData";
import { SortListGroup } from "../../../../lib/constants";
import { SortsListFetchDataProps, SortsListProps } from "../interfaces";

export const withData =
  (Component: React.FC<SortsListProps>) => (props: SortsListFetchDataProps) => {
    const appDispatch = useAppDispatch();
    const search = useAppSelector(selectSortsSearch);
    const groupBy = useAppSelector(selectSortsGroupBy);
    const sortsToggleMap = useAppSelector(selectSortsToggleMap);
    const { page, limit, refetch = false } = props;

    const {
      data,
      refetch: searchGroups,
      isLoading,
    } = useSearchGroupsQuery({
      ...(search?.search ? { search } : {}),
      offset: (page - 1) * limit,
      limit,
    });

    useEffect(() => {
      if (data?.length) {
        const openMapDefault = data.reduce<Record<string, boolean>>(
          (map, group) => {
            map[`group_${group.id}`] = group.deletedAt
              ? false
              : sortsToggleMap[`group_${group.id}`] ||
                groupBy !== SortListGroup.group;

            group.categories.forEach((cat) => {
              map[`category_${cat.id}`] = cat.deletedAt
                ? false
                : sortsToggleMap[`category_${cat.id}`] ||
                  (groupBy !== SortListGroup.category &&
                    groupBy !== SortListGroup.group);
            });
            return map;
          },
          {}
        );

        appDispatch(setSortsToggleMap(openMapDefault));
      }
      // eslint-disable-next-line
    }, [data, appDispatch]);

    useEffect(() => {
      if (refetch) {
        searchGroups();
      }
    }, [refetch, searchGroups]);

    if (isLoading) {
      return <div>Cargando...</div>;
    }

    if (!data?.length && search.search) {
      return <NoData />;
    }

    if (!data) {
      return <></>;
    }

    return <Component {...props} data={data} />;
  };
