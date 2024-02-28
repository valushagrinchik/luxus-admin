import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./PlantationsList.module.css";
import L18nEs from "../../lib/l18n";
import { memo, useMemo, useState } from "react";
import { EditIcon } from "../../controls/icons/EditIcon";
import { PlantationThin } from "../../lib/types";
import { Checkbox } from "../../controls/Checkbox";
import { CountryIcon } from "../../controls/icons/CountryIcon";
import {
  selectSelectedPlantations,
  setSelectedPlantations,
} from "../../redux/reducer/catalogReducer";
import { orderBy, pick, uniq } from "lodash";
import { FullArrowUpIcon } from "../../controls/icons/FullArrowUpIcon";

import { AdminApprovableRow, Row } from "./components/Row/Row";
import { withPagination } from "./hocs/withPagination";
import { withData } from "./hocs/withData";
import { PlantationsListProps } from "./interfaces";

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

const PlantationsList = ({ data, actions }: PlantationsListProps) => {
  const appDispatch = useAppDispatch();
  const selectedPlantations = useAppSelector(selectSelectedPlantations);
  const termsOfPayments = L18nEs.constants.termsOfPayments;

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
    </>
  );
};

export const PlantationsListMemo = memo(PlantationsList);
export const PlantationsListDataMemo = memo(withData(PlantationsListMemo));
export const PaginatedPlantationsList = memo(
  withPagination(PlantationsListDataMemo)
);
