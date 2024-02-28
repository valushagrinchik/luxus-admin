import Pagination from "@mui/material/Pagination";

import { useEffect } from "react";
import {
  selectPlantationsListPage,
  selectPlantationsSearch,
  setPlantationsListPage,
  setPlantationsListTotal,
} from "../../../redux/reducer/catalogReducer";
import {
  PlantationsListFetchDataProps,
  PlantationsListPaginatedProps,
} from "../interfaces";
import { useSearchPlantationsTotalQuery } from "../../../api/plantationsApi";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export const withPagination =
  (Component: React.FC<PlantationsListFetchDataProps>) =>
  ({ limit = 10, ...props }: PlantationsListPaginatedProps) => {
    const appDispatch = useAppDispatch();
    const page = useAppSelector(selectPlantationsListPage);
    const search = useAppSelector(selectPlantationsSearch);
    const { filters, refetch } = props;

    const {
      data: total,
      isSuccess,
      refetch: getTotal,
    } = useSearchPlantationsTotalQuery({
      ...(search?.search ? { search } : {}),
      ...filters,
    });

    // useEffect(() => {
    //   getTotal();
    // }, [refetch, getTotal]);

    useEffect(() => {
      if (isSuccess) {
        appDispatch(setPlantationsListTotal(total?.total));
        if (Math.ceil(total?.total / limit) < page) {
          appDispatch(setPlantationsListPage(Math.ceil(total?.total / limit)));
        }
      }
    }, [total?.total, isSuccess, appDispatch]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Component {...props} page={page} limit={limit} />
        {isSuccess && total.total > 0 && (
          <Pagination
            sx={{
              alignSelf: "flex-end",
              ".MuiPaginationItem-root": {
                border: "none",
                backgroundColor: "var(--Gray-100, #f2f4f7)",
                color: "var(--Gray-700, #101828)",
              },
              ".MuiPaginationItem-root:hover": {
                color: "var(--Primary-800, #0040c1)",
                background: "var(--Primary-100)",
              },
              ".MuiPaginationItem-root.Mui-selected": {
                border: "none",
                color: "var(--Primary-800, #0040c1)",
                background: "var(--Primary-100)",
              },
              ".MuiPaginationItem-root.Mui-selected:hover": {
                border: "none",
                backgroundColor: "var(--Gray-300, #f2f4f7)",
                color: "var(--Gray-700, #101828)",
              },
            }}
            count={total?.total ? Math.ceil(total.total / limit) : 0}
            page={page}
            onChange={(event, page) => {
              appDispatch(setPlantationsListPage(page));
            }}
            variant="outlined"
            shape="rounded"
            // className={styles.pagination}
          />
        )}
      </div>
    );
  };
