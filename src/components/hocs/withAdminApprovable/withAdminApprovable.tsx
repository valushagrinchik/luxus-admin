import { FC, ReactNode } from "react";
import styles from "./withAdminApprovable.module.css";
import { useAuth } from "../../../lib/auth";
import { Button } from "../../../controls/Button/Button";
import { CloseIconSmall } from "../../../controls/icons/CloseIconSmall";
import { OkIconSmall } from "../../../controls/icons/OkIconSmall";

export const withAdminApprovable = function <T>(Component: FC<T>) {
  return (
    props: T &
      JSX.IntrinsicAttributes & {
        rawData: any;
        renderActions: (data: any) => ReactNode;
        onCancel: (data: any) => Promise<void>;
        onAdminRefuse: (data: any) => Promise<void>;
        onAdminApprove: (data: any) => Promise<void>;
      }
  ) => {
    const {
      rawData: meta,
      onCancel,
      onAdminRefuse,
      onAdminApprove,
      renderActions,
    } = props;

    const { user, isAdmin } = useAuth();
    const isCancelable = !!meta.deletedAt && !isAdmin;
    const isAdminApproveRequired = user && isAdmin && !!meta?.deletedAt;

    const renderAdminActions = (data: any) => {
      return (
        <div className={styles.admin_actions}>
          <Button
            color="red"
            className={styles.admin_action_btn}
            onClick={(event) => {
              event.stopPropagation();
              onAdminRefuse(data);
            }}
          >
            <CloseIconSmall width={12} height={12} />
          </Button>
          <Button
            color="green"
            className={styles.admin_action_btn}
            onClick={(event) => {
              event.stopPropagation();
              onAdminApprove(data);
            }}
          >
            <OkIconSmall width={12} height={12} />
          </Button>
        </div>
      );
    };

    return (
      <div className={styles.container}>
        {isCancelable && (
          <CancelableRow
            canBeCanceled={meta.deletedBy === user.id}
            data={meta}
            onCancel={onCancel}
          />
        )}
        <Component
          {...props}
          renderActions={(data: any) => {
            return (
              <>
                {isAdminApproveRequired && renderAdminActions(data)}
                {renderActions(data)}
              </>
            );
          }}
          bgColor={isAdminApproveRequired ? "var(--Red-50, #fef3f2)" : "white"}
        />
      </div>
    );
  };
};

type CancelableRowProps = {
  canBeCanceled: boolean;
  data: { deletedAt?: string; deletedBy?: number };
  onCancel: (data: any) => void;
};

const CancelableRow = ({
  canBeCanceled,
  data,
  onCancel,
}: CancelableRowProps) => {
  return (
    <div className={styles.not_approved_yet}>
      <span>PARA ELIMINAR</span>
      <div className={styles.actions}>
        {canBeCanceled && (
          <Button
            className={styles.cancel_btn}
            color="red"
            onClick={() => onCancel(data)}
          >
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
};
