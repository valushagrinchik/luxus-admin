import { useState } from "react";
import { SortsFilters } from "../components/SortsFilters/SortsFilters";
import { SortsList } from "../components/SortsList/SortsList";
import { Modal } from "../controls/Modal";
import { EditGroupForm } from "../components/forms/EditGroupForm/EditGroupForm";
import { EditCategoryForm } from "../components/forms/EditCategoryForm/EditCategoryForm";
import { AdminConfirmationFormTitles, SortListGroup } from "../lib/constants";
import { EditSortForm } from "../components/forms/EditSortForm/EditSortForm";
import Box from "../controls/Box";
import { ConfirmationForm } from "../components/forms/ConfirmationForm/ConfirmationForm";
import {
  useDeleteCategoryMutation,
  useDeleteGroupMutation,
  useDeleteSortMutation,
} from "../api/sortsApi";
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectSelectedSorts,
  setSelectedSorts,
} from "../redux/reducer/catalogReducer";
import { AdminConfirmationForm } from "../components/forms/AdminConfirmationForm/AdminConfirmationForm";
import { useAuth } from "../lib/auth";
import { ListActionType, Mode } from "../lib/types";

const SortsListPage = () => {
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const appDispatch = useAppDispatch();

  const [modalConfig, setModalConfig] = useState<{
    modalType: ListActionType;
    type: SortListGroup;
    data: any;
  } | null>(null);

  const handleOpen = (
    modalType: ListActionType,
    type: SortListGroup,
    data: any
  ) => {
    setModalConfig({
      modalType,
      type,
      data,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setRefetch(true);
    setOpen(false);
  };

  const [sortListGroup, setSortListGroup] = useState(SortListGroup.sort);

  const selectedSorts = useAppSelector(selectSelectedSorts);
  const [deleteSort] = useDeleteSortMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteGroup] = useDeleteGroupMutation();

  const handleDelete = async () => {
    switch (modalConfig?.type) {
      case SortListGroup.sort: {
        if (modalConfig.data?.id) {
          // aprove from admin
          await deleteSort(modalConfig.data.id);
          break;
        }

        const deletePromises = selectedSorts.map((id) => deleteSort(id));
        await Promise.allSettled(deletePromises);
        appDispatch(setSelectedSorts([]));
        break;
      }
      case SortListGroup.category: {
        await deleteCategory(modalConfig.data.id);
        break;
      }
      case SortListGroup.group: {
        await deleteGroup(modalConfig.data.id);
        break;
      }
    }

    handleClose();
  };

  const renderActionForm = () => {
    if (!modalConfig) {
      return;
    }
    if (
      modalConfig?.modalType === ListActionType.cancel ||
      modalConfig?.modalType === ListActionType.admin_refuse
    ) {
      return;
    }
    if (modalConfig?.modalType === ListActionType.delete) {
      if (isAdmin) {
        return (
          <AdminConfirmationForm
            title={AdminConfirmationFormTitles[modalConfig.type]}
            onReset={handleClose}
            onSubmit={handleDelete}
          />
        );
      }
      return <ConfirmationForm onReset={handleClose} onSubmit={handleDelete} />;
    }

    if (modalConfig?.modalType === ListActionType.admin_approve) {
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
        onSortListGroupChange={setSortListGroup}
        onCreateBtnClick={(type) => {
          handleOpen(ListActionType.create, type, {});
        }}
        onDeleteBtnClick={() => {
          handleOpen(ListActionType.delete, SortListGroup.sort, {});
        }}
      />
      <Box>
        <SortsList
          refetch={refetch}
          openModal={(action, type, data) => handleOpen(action, type, data)}
          group={sortListGroup}
        />
        <Modal open={open} onClose={handleClose}>
          {renderActionForm()}
        </Modal>
      </Box>
    </div>
  );
};

export default SortsListPage;
