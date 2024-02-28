import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./PlantationsList.module.css";
import { EditBaseInput } from "../forms/EditPlantationForm/interfaces";
import L18nEs from "../../lib/l18n";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { EditIcon } from "../../controls/icons/EditIcon";
import { PlantationFilters, PlantationThin } from "../../lib/types";
import Pagination from "@mui/material/Pagination";
import {
  useSearchPlantationsQuery,
  useSearchPlantationsTotalQuery,
} from "../../api/plantationsApi";
import { Checkbox } from "../../controls/Checkbox";
import { CountryIcon } from "../../controls/icons/CountryIcon";
import {
  selectPlantationsListPage,
  selectPlantationsSearch,
  selectSelectedPlantations,
  setPlantationsListPage,
  setPlantationsListTotal,
  setSelectedPlantations,
} from "../../redux/reducer/catalogReducer";
import { orderBy, pick, uniq } from "lodash";
import { withAdminApprovable } from "../hocs/withAdminApprovable/withAdminApprovable";
import { FullArrowUpIcon } from "../../controls/icons/FullArrowUpIcon";
import Box from "../../controls/Box";
import { PLANTATIONS_LIST_LIMIT } from "../../lib/constants";
interface RowProps {
  data: EditBaseInput;
  className?: string;
  renderCheckbox?: (data: EditBaseInput) => ReactNode;
  renderActions?: (data: EditBaseInput) => ReactNode;
  onShow?: (data: EditBaseInput) => void;
  bgColor?: string;
  columnsWidth?: string;
  renderCell?: (key: string, value: any) => ReactNode;
}

const Row = ({
  columnsWidth,
  bgColor = "white",
  data,
  className,
  renderCheckbox = () => <></>,
  renderActions = () => <></>,
  onShow,
  renderCell,
}: RowProps) => {
  const rowStyle = {
    gridTemplateColumns:
      columnsWidth || `repeat(${Object.keys(data).length + 1}, 1fr)`,
  };

  return (
    <div
      className={classNames(styles.row, className, {
        clickable: !!onShow,
      })}
      style={{ ...rowStyle, backgroundColor: bgColor }}
      onDoubleClick={(event) => onShow?.call(this, data)}
    >
      <div className={styles.checkbox_area}>{renderCheckbox(data)}</div>
      {Object.entries(data).map(([key, value], index) => (
        <div key={`${key}_${index}`}>
          {renderCell ? renderCell(key, value) : value}
        </div>
      ))}
      <div className={styles.actions_area}>{renderActions(data)}</div>
    </div>
  );
};

export const AdminApprovableRow = withAdminApprovable<RowProps>(Row);

const Table = ({ children }: { children: any }) => {
  return <div className={styles.table}>{children}</div>;
};

const SortableTitle = ({
  title,
  onChange,
}: {
  title: string;
  onChange: (up: boolean) => void;
}) => {
  const [up, setUp] = useState<boolean>(true);
  return (
    <>
      {title}

      <FullArrowUpIcon
        color="var(--Gray-300)"
        style={{
          cursor: "pointer",
          ...(up ? {} : { transform: "rotate(180deg)" }),
        }}
        onClick={() => {
          setUp(!up);
          onChange(!up);
        }}
      />
    </>
  );
};

type PlantationsListProps = {
  filters: PlantationFilters | null;
  actions: {
    onShow: (data: any) => Promise<void>;
    onEdit: (data: any) => Promise<void>;
    onCancel: (data: any) => Promise<void>;
    onAdminRefuse: (data: any) => Promise<void>;
    onAdminApprove: (data: any) => Promise<void>;
  };
  refetch?: boolean;
};
export const PlantationsList = ({
  filters,
  actions,
  refetch = false,
}: PlantationsListProps) => {
  const appDispatch = useAppDispatch();
  const selectedPlantations = useAppSelector(selectSelectedPlantations);
  const termsOfPayments = L18nEs.constants.termsOfPayments;
  const limit = PLANTATIONS_LIST_LIMIT;
  const page = useAppSelector(selectPlantationsListPage);
  const search = useAppSelector(selectPlantationsSearch);

  const [sortBy, setSortBy] = useState<{
    field: keyof PlantationThin;
    up: boolean;
  } | null>(null);

  const headers = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(L18nEs.pages.plantation.list.table.headers).map(
          ([key, value]) => {
            return [
              key,
              ["id", "name", "legalEntitiesNames", "postpaidCredit"].includes(
                key
              ) ? (
                <SortableTitle
                  title={value}
                  onChange={(up: boolean) => {
                    setSortBy({ field: key as keyof PlantationThin, up });
                  }}
                />
              ) : (
                value
              ),
            ];
          }
        )
      ),
    []
  );

  const {
    data,
    refetch: searchPlantations,
    isLoading,
  } = useSearchPlantationsQuery({
    ...(search?.search ? { search } : {}),
    ...filters,
    offset: (page - 1) * limit,
    limit,
  });

  useEffect(() => {
    if (refetch) {
      searchPlantations();
    }
  }, [refetch, searchPlantations]);

  const { data: total, isSuccess } = useSearchPlantationsTotalQuery({
    ...(search?.search ? { search } : {}),
    ...filters,
  });

  useEffect(() => {
    if (isSuccess) {
      appDispatch(setPlantationsListTotal(total?.total));
      appDispatch(setPlantationsListPage(1));
    }
  }, [total?.total, isSuccess, appDispatch]);

  const renderCheckbox = (data: any) => {
    return (
      <Checkbox
        checked={selectedPlantations.includes(data.id)}
        onClick={(event) => event.stopPropagation()}
        onChange={(event, checked) => {
          if (checked) {
            appDispatch(
              setSelectedPlantations(uniq(selectedPlantations.concat(data.id)))
            );
          } else {
            appDispatch(
              setSelectedPlantations([
                ...selectedPlantations.filter(
                  (selected) => selected !== data.id
                ),
              ])
            );
          }
        }}
      />
    );
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!data?.length && filters) {
    return <Box>Sin resultados</Box>;
  }

  if (!data?.length) {
    return <></>;
  }

  const renderRowActions = (data: any) => {
    return (
      <EditIcon
        className={styles.edit_btn}
        onClick={(event: any) => {
          event.stopPropagation();
          actions.onEdit(data);
        }}
      />
    );
  };

  const sortData = sortBy
    ? orderBy(
        data,
        [(record) => record[sortBy.field]],
        [sortBy.up ? "desc" : "asc"]
      )
    : data;

  const columnsWidth = "20px 40px 40px 200px 1fr 150px 120px 1fr 40px";

  const renderCell = (key: string, value: any) => {
    switch (key) {
      case "legalEntitiesNames":
        return <span style={{ whiteSpace: "pre" }}>{value}</span>;
      case "country":
        return (
          <span style={{ display: "flex" }}>
            <CountryIcon countryCode={value} />
          </span>
        );
      case "termsOfPayment":
        return (
          <span className={classNames(styles.tag, styles[value])}>
            {termsOfPayments[value as keyof typeof termsOfPayments]}
          </span>
        );
      case "postpaidCredit": {
        return value || "";
      }
      case "comments": {
        return <span className={styles.comments}>{value}</span>;
      }

      default:
        return value;
    }
  };

  const fieldsToRender = [
    "id",
    "country",
    "name",
    "legalEntitiesNames",
    "termsOfPayment",
    "postpaidCredit",
    "comments",
  ];

  return (
    <>
      <Table>
        <Row
          key={"headers"}
          className={styles.headers}
          data={headers}
          columnsWidth={columnsWidth}
        ></Row>
        {sortData?.map((record) => (
          <AdminApprovableRow
            columnsWidth={columnsWidth}
            onShow={() => actions.onShow(record)}
            key={`row_${record.id}`}
            data={pick(record, fieldsToRender)}
            renderCheckbox={renderCheckbox}
            renderActions={renderRowActions}
            rawData={record}
            onCancel={actions.onCancel}
            onAdminRefuse={actions.onAdminRefuse}
            onAdminApprove={actions.onAdminApprove}
            renderCell={renderCell}
          ></AdminApprovableRow>
        ))}
      </Table>
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
        className={styles.pagination}
      />
    </>
  );
};
