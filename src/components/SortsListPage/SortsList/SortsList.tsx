import { memo } from "react";
import {
  ListActionType,
  ModelType,
  SharedActionType,
} from "../../../lib/types";
import {
  useCancelCategoryMutation,
  useCancelGroupMutation,
  useCancelSortMutation,
} from "../../../api/sortsApi";
import { SortListGroup } from "../../../lib/constants";
import { Checkbox } from "../../../controls/Checkbox";
import styles from "./SortsList.module.css";
import { Row } from "./components/Row/Row";
import { withPagination } from "./hocs/withPagination";
import { withData } from "./hocs/withData";
import { SortsListProps } from "./interfaces";

const SortsList = ({ openModal, data, emitEvent }: SortsListProps) => {
  const [cancelSort] = useCancelSortMutation();
  const [cancelCategory] = useCancelCategoryMutation();
  const [cancelGroup] = useCancelGroupMutation();

  const handleActionBtnClick = async (
    action: ListActionType,
    data: any,
    type: SortListGroup
  ) => {
    if (
      action === ListActionType.edit ||
      action === ListActionType.delete ||
      action === ListActionType.admin_approve ||
      (action === ListActionType.preview && type === SortListGroup.sort)
    ) {
      return openModal(action, type, data);
    }
    if (
      action === ListActionType.admin_refuse ||
      action === ListActionType.cancel
    ) {
      switch (type) {
        case SortListGroup.sort: {
          await cancelSort(data.id);
          emitEvent({
            type: ModelType.Sort,
            id: [data.id],
            action: action as unknown as SharedActionType,
          });
          return;
        }
        case SortListGroup.category: {
          await cancelCategory(data.id);
          emitEvent({
            type: ModelType.Category,
            id: [data.id],
            action: action as unknown as SharedActionType,
          });
          return;
        }
        case SortListGroup.group: {
          await cancelGroup(data.id);
          emitEvent({
            type: ModelType.Group,
            id: [data.id],
            action: action as unknown as SharedActionType,
          });
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
          <Row
            type={SortListGroup.group}
            key={`group_${group.id}`}
            className={styles.group}
            headerClassName={styles.header}
            data={group}
            onActionBtnClick={(action, data) =>
              handleActionBtnClick(action, data, SortListGroup.group)
            }
          >
            {group.categories?.map((cat: any) => (
              <Row
                type={SortListGroup.category}
                key={`category_${cat.id}`}
                className={styles.category}
                headerClassName={styles.header}
                data={cat}
                onActionBtnClick={(action, data) =>
                  handleActionBtnClick(action, data, SortListGroup.category)
                }
              >
                {cat.sorts?.map((sort: any) => (
                  <Row
                    type={SortListGroup.sort}
                    key={`sort_${sort.id}`}
                    className={styles.sort}
                    headerClassName={styles.header}
                    data={sort}
                    onActionBtnClick={(action, data) =>
                      handleActionBtnClick(
                        action,
                        { ...data, groupId: group.id },
                        SortListGroup.sort
                      )
                    }
                  />
                ))}
              </Row>
            ))}
          </Row>
        ))}
      </div>
    </>
  );
};

const SortsListMemo = memo(SortsList);
export const SortsListDataMemo = memo(withData(SortsListMemo));
export const PaginatedSortsList = memo(withPagination(SortsListDataMemo));
