import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../store";
import styles from "./PlantationsList.module.css";
import { EditBaseInput } from "../forms/EditPlantationForm/interfaces";
import L18nEs from "../../lib/l18n";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { EditIcon } from "../../controls/icons/EditIcon";
import { Plantation, PlantationFilters } from "../../lib/types";
import Pagination from "@mui/material/Pagination";
import {
  useSearchPlantationsQuery,
  useSearchPlantationsTotalQuery,
} from "../../api/plantationsApi";
import { Checkbox } from "../../controls/Checkbox";
import { CountryIcon } from "../../controls/icons/CountryIcon";
import {
  selectSelectedPlantations,
  setSelectedPlantations,
} from "../../redux/reducer/catalogReducer";
import { orderBy, uniq } from "lodash";
import { withAdminApprovable } from "../hocs/withAdminApprovable/withAdminApprovable";
import { FullArrowUpIcon } from "../../controls/icons/FullArrowUpIcon";

interface RowProps {
  data: EditBaseInput;
  className?: string;
  renderCheckbox?: (data: EditBaseInput) => ReactNode;
  renderActions?: (data: EditBaseInput) => ReactNode;
  onShow?: (data: EditBaseInput) => void;
  bgColor?: string;
}

const Row = ({
  bgColor = "white",
  data,
  className,
  renderCheckbox = () => <></>,
  renderActions = () => <></>,
  onShow,
}: RowProps) => {
  const isCheckable = !!renderCheckbox;
  const rowStyle = isCheckable
    ? {
        gridTemplateColumns: `40px repeat(${
          Object.keys(data).length + 1
        }, 1fr)`,
      }
    : {
        gridTemplateColumns: `repeat(${Object.keys(data).length + 1}, 1fr)`,
      };

  return (
    <div
      className={classNames(styles.row, className, {
        clickable: !!onShow,
      })}
      style={{ ...rowStyle, backgroundColor: bgColor }}
      onClick={(event) => onShow?.call(this, data)}
    >
      <div className={styles.checkbox_area}>{renderCheckbox(data)}</div>
      {Object.entries(data).map(([key, value], index) => (
        <div key={`${key}_${index}`}>{value}</div>
      ))}
      <div className={styles.actions_area}>{renderActions(data)}</div>
    </div>
  );
};

const AdminApprovableRow = withAdminApprovable<RowProps>(Row);

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

  const [sortBy, setSortBy] = useState<{
    field: keyof Plantation;
    up: boolean;
  } | null>(null);

  const headers = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(L18nEs.pages.plantation.list.table.headers).map(
          ([key, value]) => {
            return [
              key,
              ["id", "name", "legalEntityName", "postpaidCredit"].includes(
                key
              ) ? (
                <SortableTitle
                  title={value}
                  onChange={(up: boolean) => {
                    setSortBy({ field: key as keyof Plantation, up });
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

  const termsOfPayments = L18nEs.constants.termsOfPayments;

  const limit = 10;
  const search = {};
  const [page, setPage] = useState(1);

  const {
    data,
    refetch: searchPlantations,
    isLoading,
  } = useSearchPlantationsQuery({
    ...filters,
    offset: (page - 1) * limit,
    limit,
  });

  useEffect(() => {
    if (refetch) {
      searchPlantations();
    }
  }, [refetch, searchPlantations]);

  const { data: total } = useSearchPlantationsTotalQuery({ ...search });

  const recordToRender = (record: Plantation) => ({
    id: record.id,
    country: <CountryIcon countryCode={record.country} />,
    name: record.name,
    legalEntityName: record.legalEntities[0].name,
    termsOfPayment: (
      <span className={classNames(styles.tag, styles[record.termsOfPayment])}>
        {termsOfPayments[record.termsOfPayment]}
      </span>
    ),
    postpaidCredit: record.postpaidCredit,
    comments: record.comments,
  });

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

  if (!data?.length) {
    return <div>Sin datos</div>;
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

  return (
    <>
      <Table>
        <Row key={"headers"} className={styles.headers} data={headers}></Row>
        {sortData?.map((record) => (
          <AdminApprovableRow
            onShow={() => actions.onShow(record)}
            key={`row_${record.id}`}
            data={recordToRender(record)}
            renderCheckbox={renderCheckbox}
            renderActions={renderRowActions}
            rawData={record}
            onCancel={actions.onCancel}
            onAdminRefuse={actions.onAdminRefuse}
            onAdminApprove={actions.onAdminApprove}
          ></AdminApprovableRow>
        ))}
      </Table>
      <Pagination
        count={total?.total ? Math.ceil(total.total / limit) : 0}
        page={page}
        onChange={(event, page) => {
          setPage(page);
        }}
        variant="outlined"
        shape="rounded"
        className={styles.pagination}
      />
    </>
  );
};
