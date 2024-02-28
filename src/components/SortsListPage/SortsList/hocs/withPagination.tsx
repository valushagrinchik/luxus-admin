import Pagination from "@mui/material/Pagination";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  selectSortsListPage,
  selectSortsSearch,
  setSortsListPage,
  setSortsListTotal,
} from "../../../../redux/reducer/catalogReducer";
import { useSearchGroupsTotalQuery } from "../../../../api/sortsApi";
import {
  SortsListFetchDataProps,
  SortsListPaginatedProps,
} from "../interfaces";
import { useEffect } from "react";

export const withPagination =
  (Component: React.FC<SortsListFetchDataProps>) =>
  ({ limit = 10, ...props }: SortsListPaginatedProps) => {
    const appDispatch = useAppDispatch();
    const page = useAppSelector(selectSortsListPage);
    const search = useAppSelector(selectSortsSearch);
    const { data: total, isSuccess } = useSearchGroupsTotalQuery(
      search?.search ? { search } : {}
    );

    useEffect(() => {
      if (isSuccess) {
        appDispatch(setSortsListTotal(total.total));
        appDispatch(setSortsListPage(1));
      }
    }, [total?.total, isSuccess, appDispatch]);
    return (
      <>
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
              appDispatch(setSortsListPage(page));
            }}
            variant="outlined"
            shape="rounded"
          />
        )}
      </>
    );
  };
