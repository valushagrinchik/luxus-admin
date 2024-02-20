import { ReactNode } from "react";
import styles from "./Table.module.css";
import { v4 as uuid } from "uuid";
import { EditBaseInput } from "../../interfaces";

export const Table = <T extends EditBaseInput>({
  headers,
  data,
  renderCheckbox,
  renderActions,
  renderCell,
}: {
  headers: Record<string, string>;
  data: T[];
  renderCheckbox?: (data: T) => ReactNode;
  renderActions?: (data: T) => ReactNode;
  renderCell?: (key: string, value: string) => string;
}) => {
  const isCheckable = !!renderCheckbox;
  const isActions = !!renderActions;

  const rowStyle = isCheckable
    ? {
        gridTemplateColumns: `40px repeat(${
          Object.keys(headers).length + (isActions ? 1 : 0)
        }, 1fr)`,
      }
    : {
        gridTemplateColumns: `repeat(${
          Object.keys(headers).length + (isActions ? 1 : 0)
        }, 1fr)`,
      };
  return (
    <div className={styles.table}>
      <div className={styles.header} style={rowStyle}>
        {isCheckable && <span key="checkbox_header"></span>}
        {Object.entries(headers).map(([key, header]) => (
          <span key={uuid()}>{header}</span>
        ))}
        {isActions && <span key="actions_header"></span>}
      </div>

      {data.map((row, index) => (
        <div className={styles.row} key={index} style={rowStyle}>
          {isCheckable && <span>{renderCheckbox(row)}</span>}
          {Object.keys(headers).map((key) => (
            <span key={uuid()}>
              {renderCell ? renderCell(key, row[key]) : row[key] || "-"}
            </span>
          ))}
          {isActions && (
            <span key={`actions_${index}`} className={styles.actions}>
              {renderActions(row)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
