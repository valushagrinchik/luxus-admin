import { ReactNode, useState } from "react";
import { ListActionType } from "../../../../../lib/types";
import { useAuth } from "../../../../../lib/auth";
import { Button } from "../../../../../controls/Button/Button";
import { CloseIconSmall } from "../../../../../controls/icons/CloseIconSmall";
import { OkIconSmall } from "../../../../../controls/icons/OkIconSmall";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import classNames from "classnames";
import { SortListGroup } from "../../../../../lib/constants";
import { useAppSelector } from "../../../../../redux/store";
import { selectSortsToggleMap } from "../../../../../redux/reducer/catalogReducer";
import { SortsListToggle } from "../SortsListToggle/SortsListToggle";
import styles from "./Row.module.css";
import { ArrowRightSortsIcon } from "../../../../../controls/icons/ArrowRightSortsIcon";
import { SortsSelectCheckbox } from "../SortsSelectCheckbox/SortsSelectCheckbox";

export interface RowProps {
  type: SortListGroup;
  children?: ReactNode;
  onActionBtnClick: (action: ListActionType, data: any) => void;
  data: any;
  className?: string;
  headerClassName?: string;
}
export const Row = ({
  type,
  children,
  data,
  className,
  headerClassName,
  onActionBtnClick,
}: RowProps) => {
  const sortsToggleKey = `${type}_${data.id}`;
  const { user, isAdmin } = useAuth();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const open = useAppSelector(selectSortsToggleMap)[sortsToggleKey];
  const hasChildren = Array.isArray(children) && !!children.length;
  const openable =
    type === SortListGroup.group || type === SortListGroup.category;
  const requiresAdminApprove = isAdmin && !!data.deletedAt;

  const adminActions = (
    <>
      <Button
        color="red"
        className={styles.admin_action_btn}
        onClick={() => onActionBtnClick(ListActionType.admin_refuse, data)}
      >
        <CloseIconSmall width={12} height={12} />
      </Button>
      <Button
        color="green"
        className={styles.admin_action_btn}
        onClick={() => onActionBtnClick(ListActionType.admin_approve, data)}
      >
        <OkIconSmall width={12} height={12} />
      </Button>
    </>
  );

  const actions = (
    <>
      {showDeleteBtn && (
        <BinIcon
          key=""
          className={styles.bin_icon}
          onClick={() => onActionBtnClick(ListActionType.delete, data)}
        />
      )}
      <EditIcon
        className={styles.edit_btn}
        onClick={() => onActionBtnClick(ListActionType.edit, data)}
      />
    </>
  );

  return (
    <div className={classNames(styles.row, className)}>
      <div
        className={classNames(styles.row_header, headerClassName, {
          [styles.pre_deleted_admin_view]: requiresAdminApprove,
        })}
        onMouseOver={() => openable && setShowDeleteBtn(true)}
        onMouseLeave={() => openable && setShowDeleteBtn(false)}
        onDoubleClick={() => onActionBtnClick(ListActionType.preview, data)}
      >
        {!!data.deletedAt && !isAdmin && (
          <div className={styles.pre_deleted}>
            <span>PARA ELIMINAR</span>
            <div className={styles.actions}>
              {data.deletedBy === user.id && (
                <Button
                  className={styles.cancel_btn}
                  color="red"
                  onClick={() => onActionBtnClick(ListActionType.cancel, data)}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        )}

        {openable &&
          (hasChildren ? (
            <SortsListToggle isOpenKey={sortsToggleKey} />
          ) : (
            <ArrowRightSortsIcon color="var(--Gray-300)" />
          ))}

        {type === SortListGroup.sort && <SortsSelectCheckbox id={data.id} />}

        {type === SortListGroup.sort && (
          <span className={styles.id}>{data.id}</span>
        )}
        <span className={styles.name}>{data.name}</span>
        <span className={styles.actions}>
          {requiresAdminApprove ? adminActions : actions}
        </span>
      </div>

      {openable && (
        <div className={open ? styles.visible : styles.hidden}>{children}</div>
      )}
    </div>
  );
};
