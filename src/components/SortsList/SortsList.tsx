import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { EditIcon } from "../../controls/icons/EditIcon";
import classNames from "classnames";
import { Category, Group, ListActionType, Sort } from "../../lib/types";
import {
  useCancelCategoryMutation,
  useCancelGroupMutation,
  useCancelSortMutation,
  useSearchGroupsQuery,
  useSearchGroupsTotalQuery,
} from "../../api/sortsApi";
import {
  CatalogState,
  selectSelectedSorts,
  selectSortsSearch,
  setSelectedSorts,
} from "../../redux/reducer/catalogReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import { SortListGroup } from "../../lib/constants";
import Pagination from "@mui/material/Pagination";
import { Checkbox } from "../../controls/Checkbox";
import uniq from "lodash/uniq";
import { Button } from "../../controls/Button/Button";
import { ArrowDownSmallIcon } from "../../controls/icons/ArrowDownSmallIcon";
import { ArrowRightSortsIcon } from "../../controls/icons/ArrowRightSortsIcon";
import { BinIcon } from "../../controls/icons/BinIcon";
import { useAuth } from "../../lib/auth";
import { CloseIconSmall } from "../../controls/icons/CloseIconSmall";
import { OkIconSmall } from "../../controls/icons/OkIconSmall";

import styles from "./SortsList.module.css";
import { NoData } from "../ui/NoData";

interface RowProps {
  open: boolean;
  children?: ReactNode;
  onActionBtnClick: (action: ListActionType, data: any) => void;
  openable: boolean;
  data: any;
  className?: string;
  checkable?: boolean;
  onCheck?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}
const Row = ({
  open,
  children,
  openable,
  data,
  className,
  checkable,
  onCheck,
  onActionBtnClick,
}: RowProps) => {
  const appDispatch = useAppDispatch();
  const { user, isAdmin } = useAuth();

  const selectedSorts = useAppSelector(selectSelectedSorts);

  const [isOpen, setIsOpen] = useState(open);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const hasChildren = Array.isArray(children) && !!children.length;

  const requiresAdminApprove = user && isAdmin && !!data.deletedAt;

  const renderRowActions = () => {
    if (requiresAdminApprove) {
      return (
        <>
          <Button
            color="red"
            className={styles.admin_action_btn}
            onClick={() => onActionBtnClick("admin_refuse", data)}
          >
            <CloseIconSmall width={12} height={12} />
          </Button>
          <Button
            color="green"
            className={styles.admin_action_btn}
            onClick={() => onActionBtnClick("admin_approve", data)}
          >
            <OkIconSmall width={12} height={12} />
          </Button>
        </>
      );
    }

    return (
      <>
        {showDeleteBtn && (
          <BinIcon
            key=""
            className={styles.bin_icon}
            onClick={() => onActionBtnClick("delete", data)}
          />
        )}
        <EditIcon
          className={styles.edit_btn}
          onClick={() => onActionBtnClick("update", data)}
        />
      </>
    );
  };

  return (
    <div className={classNames(styles.row, className)}>
      <div
        className={classNames(styles.row_header, {
          [styles.pre_deleted_admin_view]: requiresAdminApprove,
        })}
        onMouseOver={() => openable && setShowDeleteBtn(true)}
        onMouseLeave={() => openable && setShowDeleteBtn(false)}
      >
        {!!data.deletedAt && !isAdmin && (
          <div className={styles.pre_deleted}>
            <span>PARA ELIMINAR</span>
            <div className={styles.actions}>
              {data.deletedBy === user.id && (
                <Button
                  className={styles.cancel_btn}
                  color="red"
                  onClick={() => onActionBtnClick("cancel", data)}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        )}

        {openable && (
          <span className={styles.arrow_space}>
            {!hasChildren && <ArrowRightSortsIcon color="var(--Gray-300)" />}

            {hasChildren && (
              <span
                className={styles.toggle_btn}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <ArrowDownSmallIcon color="#0040C1" />
                ) : (
                  <ArrowRightSortsIcon color="var(--Gray-900)" />
                )}
              </span>
            )}
          </span>
        )}
        {checkable && (
          <Checkbox
            checked={selectedSorts.includes(data.id)}
            onChange={(e, checked) => {
              if (checked) {
                appDispatch(
                  setSelectedSorts(uniq(selectedSorts.concat(data.id)))
                );
              } else {
                appDispatch(
                  setSelectedSorts([
                    ...selectedSorts.filter((selected) => selected !== data.id),
                  ])
                );
              }
            }}
          />
        )}
        {checkable && <span className={styles.id}>{data.id}</span>}
        <span className={styles.name}>{data.name}</span>
        <span className={styles.actions}>{renderRowActions()}</span>
      </div>

      {openable && children && (
        <div className={openable && isOpen ? styles.visible : styles.hidden}>
          {children}
        </div>
      )}
    </div>
  );
};

const defineRowConfig = (group: SortListGroup) => {
  switch (group) {
    case SortListGroup.group: {
      return {
        group: false,
        category: false,
        sort: false,
      };
    }
    case SortListGroup.category: {
      return {
        group: true,
        category: false,
        sort: false,
      };
    }
    case SortListGroup.sort: {
      return {
        group: true,
        category: true,
        sort: false,
      };
    }
  }
};

interface SortsListProps {
  openModal: (
    action: "update" | "delete",
    type: SortListGroup,
    data: Group | Category | Sort
  ) => void;
  group?: SortListGroup;
  refetch?: boolean;
}

export const SortsList = ({
  openModal,
  group = SortListGroup.sort,
  refetch = false,
}: SortsListProps) => {
  const limit = 10;
  const search: CatalogState["sortsSearch"] = useAppSelector(selectSortsSearch);
  const [config, setConfig] = useState(defineRowConfig(group));
  const [page, setPage] = useState(1);

  const [cancelSort] = useCancelSortMutation();
  const [cancelCategory] = useCancelCategoryMutation();
  const [cancelGroup] = useCancelGroupMutation();

  const {
    data,
    refetch: searchGroups,
    isLoading,
  } = useSearchGroupsQuery({
    ...search,
    offset: (page - 1) * limit,
    limit,
  });
  const { data: total } = useSearchGroupsTotalQuery({ ...search });

  useEffect(() => {
    setConfig(defineRowConfig(group));
  }, [group]);

  useEffect(() => {
    if (search.search) {
      setConfig(defineRowConfig(search.type));
    }
  }, [search]);

  useEffect(() => {
    if (refetch) {
      searchGroups();
    }
  }, [refetch, searchGroups]);

  const handleActionBtnClick = async (
    action: any,
    data: any,
    type: SortListGroup
  ) => {
    if (
      action === "update" ||
      action === "delete" ||
      action === "admin_approve"
    ) {
      return openModal(action, type, data);
    }
    if (action === "admin_refuse" || action === "cancel") {
      switch (type) {
        case SortListGroup.sort: {
          await cancelSort(data.id);
          return;
        }
        case SortListGroup.category: {
          await cancelCategory(data.id);
          return;
        }
        case SortListGroup.group: {
          await cancelGroup(data.id);
          return;
        }
      }
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!data?.length && !search.search) {
    return <></>;
  }

  if (!data?.length && search.search) {
    return <NoData />;
  }

  return (
    <>
      <div className={styles.sorts_list}>
        <div className={styles.header}>
          <Checkbox disabled />
          <span className={styles.id}>N°</span>
          <span className={styles.name}>Variedad</span>
        </div>

        {data?.map((group) => (
          <Row
            open={config.group}
            key={`group_${group.id}`}
            className={styles.group}
            openable={true}
            data={group}
            onActionBtnClick={(action, data) =>
              handleActionBtnClick(action, data, SortListGroup.group)
            }
          >
            {group.categories?.map((cat: any) => (
              <Row
                open={config.category}
                key={`category_${cat.id}`}
                className={styles.category}
                openable={true}
                data={cat}
                onActionBtnClick={(action, data) =>
                  handleActionBtnClick(action, data, SortListGroup.category)
                }
              >
                {cat.sorts?.map((sort: any) => (
                  <Row
                    open={config.sort}
                    key={`sort_${sort.id}`}
                    className={styles.sort}
                    openable={false}
                    data={sort}
                    checkable={true}
                    onActionBtnClick={(action, data) =>
                      handleActionBtnClick(
                        action,
                        { ...data, groupId: group.id },
                        SortListGroup.sort
                      )
                    }
                  ></Row>
                ))}
              </Row>
            ))}
          </Row>
        ))}
      </div>
      <Pagination
        sx={{
          ".MuiPaginationItem-root.Mui-selected": {
            border: "none",
            backgroundColor: "var(--Gray-100, #f2f4f7)",
            color: "var(--Gray-700, #101828)",
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
          setPage(page);
        }}
        variant="outlined"
        shape="rounded"
        className={styles.pagination}
      />
    </>
  );
};
