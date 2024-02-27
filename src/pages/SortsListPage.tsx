import { useCallback, useEffect, useState } from "react";
import { SortsFilters } from "../components/SortsListPage/SortsFilters/SortsFilters";
import { PaginatedSortsList } from "../components/SortsListPage/SortsList/SortsList";
import { Modal } from "../controls/Modal";
import { EditGroupForm } from "../components/forms/EditGroupForm/EditGroupForm";
import { EditCategoryForm } from "../components/forms/EditCategoryForm/EditCategoryForm";
import { AdminConfirmationFormTitles, SORTS_LIST_LIMIT, SortListGroup } from "../lib/constants";
import { EditSortForm } from "../components/forms/EditSortForm/EditSortForm";
import Box from "../controls/Box";
import {
  useDeleteCategoryMutation,
  useDeleteGroupMutation,
} from "../api/sortsApi";
import { AdminConfirmationForm } from "../components/forms/AdminConfirmationForm/AdminConfirmationForm";
import {
  ListActionType,
  Mode,
  ModelType,
  SharedActionType,
} from "../lib/types";
import { useWS } from "../hooks/useWS";
import { ConfirmationForm } from "../components/forms/ConfirmationForm/ConfirmationForm";
import { useAuth } from "../lib/auth";

const SortsListPage = () => {
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const { event, emitEvent } = useWS();
  useEffect(() => {
    if (
      event &&
      [ModelType.Group, ModelType.Category, ModelType.Sort].includes(event.type)
    ) {
      setRefetch(true);
    }
  }, [event]);

  const [modalConfig, setModalConfig] = useState<{
    modalType: ListActionType;
    type: SortListGroup;
    data: any;
  } | null>(null);

  const handleOpen = useCallback(
    (modalType: ListActionType, type: SortListGroup, data: any) => {
      setModalConfig({
        modalType,
        type,
        data,
      });
      setOpen(true);
    },
    [setModalConfig, setOpen]
  );

  const handleClose = () => {
    setRefetch(true);
    setOpen(false);
  };

  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteGroup] = useDeleteGroupMutation();

  const handleDelete = async () => {
    switch (modalConfig?.type) {
      case SortListGroup.category: {
        await deleteCategory(modalConfig.data.id);
        emitEvent({
          type: ModelType.Category,
          id: [modalConfig.data.id],
          action: SharedActionType.delete,
        });
        break;
      }
      case SortListGroup.group: {
        await deleteGroup(modalConfig.data.id);
        emitEvent({
          type: ModelType.Group,
          id: [modalConfig.data.id],
          action: SharedActionType.delete,
        });
        break;
      }
      default: {
        throw new Error("Can't be performed");
      }
    }

    handleClose();
  };

  const renderActionForm = () => {
    if (!modalConfig) {
      return;
    }

    if (modalConfig?.modalType === ListActionType.delete && !isAdmin) {
      return <ConfirmationForm onReset={handleClose} onSubmit={handleDelete} />;
    }

    if (
      modalConfig?.modalType === ListActionType.admin_approve ||
      (modalConfig?.modalType === ListActionType.delete && isAdmin)
    ) {
      return (
        <AdminConfirmationForm
          title={AdminConfirmationFormTitles[modalConfig.type]}
          onReset={handleClose}
          onSubmit={handleDelete}
        />
      );
    }

    const mode = modalConfig.modalType as unknown as Mode;
    switch (modalConfig.type) {
      case SortListGroup.group: {
        return (
          <EditGroupForm
            mode={mode}
            onSubmit={handleClose}
            onReset={handleClose}
            data={modalConfig.data}
          />
        );
      }
      case SortListGroup.category: {
        return (
          <EditCategoryForm
            mode={mode}
            onSubmit={handleClose}
            onReset={handleClose}
            data={modalConfig.data}
          />
        );
      }
      case SortListGroup.sort: {
        return (
          <EditSortForm
            mode={mode}
            onSubmit={handleClose}
            onReset={handleClose}
            data={modalConfig.data}
          />
        );
      }
    }
  };

  return (
    <div className="container">
      <h1>Variedades</h1>
      <SortsFilters
        onCreateBtnClick={(type) => {
          handleOpen(ListActionType.create, type, {});
        }}
      />
      <Box>
        <PaginatedSortsList
          emitEvent={emitEvent}
          refetch={refetch}
          openModal={handleOpen}
          limit={SORTS_LIST_LIMIT}
        />
      </Box>
      <Modal open={open} onClose={handleClose}>
        {renderActionForm()}
      </Modal>
    </div>
  );
};

export default SortsListPage;
