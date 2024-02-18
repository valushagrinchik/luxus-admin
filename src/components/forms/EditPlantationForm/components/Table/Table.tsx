import { ReactNode } from "react";
import styles from "./Table.module.css";
import { v4 as uuid } from "uuid";
import { EditBaseInput } from "../../interfaces";

export const Table = <T extends EditBaseInput>({
  headers,
  data,
  renderCheckbox,
  renderActions = (data: T) => <></>,
}: {
  headers: Record<string, string>;
  data: T[];
  renderCheckbox?: (data: T) => ReactNode;

  renderActions?: (data: T) => ReactNode;
}) => {
  const isCheckable = !!renderCheckbox;
  const rowStyle = isCheckable
    ? {
        gridTemplateColumns: `40px repeat(${
          Object.keys(headers).length + 1
        }, 1fr)`,
      }
    : {
        gridTemplateColumns: `repeat(${Object.keys(headers).length + 1}, 1fr)`,
      };
  return (
    <div className={styles.table}>
      <div className={styles.header} style={rowStyle}>
        {isCheckable && <span key="checkbox_header"></span>}
        {Object.entries(headers).map(([key, header]) => (
          <span key={uuid()}>{header}</span>
        ))}
        <span key="actions_header"></span>
      </div>

      {data.map((row, index) => (
        <div className={styles.row} key={index} style={rowStyle}>
          {isCheckable && <span>{renderCheckbox(row)}</span>}
          {Object.keys(headers).map((key, index) => (
            <span key={uuid()}>{row[key] || "-"}</span>
          ))}
          <span key={`actions_${index}`} className={styles.actions}>
            {renderActions(row)}
          </span>
        </div>
      ))}
    </div>
  );
};
