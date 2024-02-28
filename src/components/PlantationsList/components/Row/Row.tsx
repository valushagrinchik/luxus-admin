import classNames from "classnames";
import { ReactNode } from "react";
import { EditBaseInput } from "../../../forms/EditPlantationForm/interfaces";
import styles from "./Row.module.css";
import { withAdminApprovable } from "../../../hocs/withAdminApprovable/withAdminApprovable";

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

export const Row = ({
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
