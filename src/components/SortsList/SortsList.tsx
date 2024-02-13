import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { EditIcon } from "../../controls/icons/EditIcon";
import classNames from "classnames";
import { Category, Group, Sort } from "../../lib/types";
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

import styles from "./SortsList.module.css";
import { Button } from "../../controls/Button/Button";
import { ArrowDownSortsIcon } from "../../controls/icons/ArrowDownSortsIcon";
import { ArrowRightSortsIcon } from "../../controls/icons/ArrowRightSortsIcon";
import { BinIcon } from "../../controls/icons/BinIcon";

interface BaseRawProps {
  open: boolean;
  children?: ReactNode;
  onActionBtnClick: (action: "update" | "cancel" | "delete", data: any) => void;
}

interface SortRawProps extends BaseRawProps {
  sort: Sort;
}

interface CategoryRawProps extends BaseRawProps {
  category: Category;
}
interface GroupRawProps extends BaseRawProps {
  group: Group;
}

interface RawProps extends BaseRawProps {
  openable: boolean;
  data: any;
  className?: string;
  checkable?: boolean;
  onCheck?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}
const Raw = ({
  open,
  children,
  openable,
  data,
  className,
  checkable,
  onCheck,
  onActionBtnClick,
}: RawProps) => {
  const appDispatch = useAppDispatch();

  const selectedSorts = useAppSelector(selectSelectedSorts);

  const [isOpen, setIsOpen] = useState(open);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const hasChildren = Array.isArray(children) && !!children.length;

  return (
    <div className={classNames(styles.row, className)}>
      <div
        className={classNames(styles.row_header)}
        onMouseOver={() => openable && setShowDeleteBtn(true)}
        onMouseLeave={() => openable && setShowDeleteBtn(false)}
      >
        {!!data.deletedAt && (
          <div className={styles.row_marked_as_deleted}>
            <span>PARA ELIMINAR</span>
            <div className={styles.actions}>
              <Button
                className={styles.cancel_btn}
                appearance="red"
                onClick={() => onActionBtnClick("cancel", data)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {openable && (
          <span className={styles.arrow_space}>
            {hasChildren && (
              <span
                className={styles.toggle_btn}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <ArrowDownSortsIcon color="#0040C1" />
                ) : (
                  <ArrowRightSortsIcon color="var(--Gray-900)" />
                )}
              </span>
            )}
          </span>
        )}
        {checkable && (
          <Checkbox
            onChange={(e, checked) => {
              if (checked) {
                appDispatch(setSelectedSorts([...selectedSorts, data.id]));
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
        <span className={styles.actions}>
          {showDeleteBtn && (
            <BinIcon
              className={styles.bin_icon}
              onClick={() => onActionBtnClick("delete", data)}
            />
          )}

          <EditIcon
            className="clickable"
            onClick={() => onActionBtnClick("update", data)}
          />
        </span>
      </div>

      {openable && (
        <div className={openable && isOpen ? styles.visible : styles.hidden}>
          {children}
        </div>
      )}
    </div>
  );
};

const SortRaw = ({ open, children, sort, onActionBtnClick }: SortRawProps) => {
  return (
    <Raw
      open={open}
      className={styles.sort}
      openable={false}
      data={sort}
      checkable={true}
      onActionBtnClick={onActionBtnClick}
    >
      {children}
    </Raw>
  );
};
const CategoryRaw = ({
  open,
  children,
  category,
  onActionBtnClick,
}: CategoryRawProps) => {
  return (
    <Raw
      open={open}
      className={styles.category}
      openable={true}
      data={category}
      onActionBtnClick={onActionBtnClick}
    >
      {children}
    </Raw>
  );
};
const GroupRaw = ({
  open,
  group,
  onActionBtnClick,
  children,
}: GroupRawProps) => {
  return (
    <Raw
      open={open}
      className={styles.group}
      openable={true}
      data={group}
      onActionBtnClick={onActionBtnClick}
    >
      {children}
    </Raw>
  );
};

const defineRawConfig = (group: SortListGroup) => {
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
  const [config, setConfig] = useState(defineRawConfig(group));
  const [page, setPage] = useState(1);

  const [cancelSort] = useCancelSortMutation();
  const [cancelCategory] = useCancelCategoryMutation();
  const [cancelGroup] = useCancelGroupMutation();

  const { data, refetch: searchGroups } = useSearchGroupsQuery({
    ...search,
    offset: (page - 1) * limit,
    limit,
  });
  const { data: total } = useSearchGroupsTotalQuery({ ...search });

  useEffect(() => {
    setConfig(defineRawConfig(group));
  }, [group]);

  useEffect(() => {
    if (search.search) {
      setConfig(defineRawConfig(search.type));
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
    if (action === "update" || action === "delete") {
      return openModal(action, type, data);
    }
    if (action === "cancel") {
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

  return (
    <>
      <div className={styles.sorts_list}>
        <div className={styles.header}>
          <Checkbox disabled />
          <span className={styles.id}>N°</span>
          <span className={styles.name}>Variedad</span>
        </div>

        {data?.map((group) => (
          <GroupRaw
            open={config.group}
            key={`group_${group.id}`}
            onActionBtnClick={(action, data) =>
              handleActionBtnClick(action, data, SortListGroup.group)
            }
            group={group}
          >
            {group.categories?.map((cat) => (
              <CategoryRaw
                open={config.category}
                key={`category_${cat.id}`}
                category={cat}
                onActionBtnClick={(action, data) =>
                  handleActionBtnClick(action, data, SortListGroup.category)
                }
              >
                {cat.sorts?.map((sort: any) => (
                  <SortRaw
                    open={config.sort}
                    sort={sort}
                    key={`sort_${sort.id}`}
                    onActionBtnClick={(action, data) =>
                      handleActionBtnClick(
                        action,
                        { ...data, groupId: group.id },
                        SortListGroup.sort
                      )
                    }
                  ></SortRaw>
                ))}
              </CategoryRaw>
            ))}
          </GroupRaw>
        ))}
      </div>
      <Pagination
        count={total?.total ? Math.round(total.total / limit) : 0}
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
