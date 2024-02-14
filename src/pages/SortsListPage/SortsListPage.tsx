import { useState } from "react";
import { SortsFilters } from "../../components/SortsFilters/SortsFilters";
import { SortsList } from "../../components/SortsList/SortsList";
import { Modal } from "../../controls/Modal";
import { EditGroupForm } from "../../components/forms/EditGroupForm/EditGroupForm";
import { EditCategoryForm } from "../../components/forms/EditCategoryForm/EditCategoryForm";
import { SortListGroup } from "../../lib/constants";
import { EditSortForm } from "../../components/forms/EditSortForm/EditSortForm";
import Box from "../../controls/Box";
import { ConfirmationForm } from "../../components/forms/ConfirmationForm/ConfirmationForm";
import {
  useDeleteCategoryMutation,
  useDeleteGroupMutation,
  useDeleteSortMutation,
} from "../../api/sortsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectSelectedSorts,
  setSelectedSorts,
} from "../../redux/reducer/catalogReducer";
import { AdminConfirmationForm } from "../../components/forms/AdminConfirmationForm/AdminConfirmationForm";

type ModalType = "create" | "update" | "delete" | "admin_approve";

const renderForm = (
  {
    contentData,
    ...props
  }: {
    contentData: any;
    onSubmit: () => void;
    onReset: () => void;
  },
  modalType: "create" | "update",
  type: SortListGroup
) => {
  switch (type) {
    case SortListGroup.group: {
      return <EditGroupForm {...props} action={modalType} data={contentData} />;
    }
    case SortListGroup.category: {
      return (
        <EditCategoryForm {...props} action={modalType} data={contentData} />
      );
    }
    case SortListGroup.sort: {
      return <EditSortForm {...props} action={modalType} data={contentData} />;
    }
  }
};

export const SortsListPage = () => {
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const appDispatch = useAppDispatch();

  const [modalConfig, setModalConfig] = useState<{
    modalType: ModalType;
    type: SortListGroup;
    data: any;
  } | null>(null);

  const handleOpen = (modalType: ModalType, type: SortListGroup, data: any) => {
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

        for (let id of selectedSorts) {
          await deleteSort(id);
        }
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
    if (modalConfig?.modalType === "delete") {
      return <ConfirmationForm onReset={handleClose} onSubmit={handleDelete} />;
    }

    if (modalConfig?.modalType === "admin_approve") {
      return (
        <AdminConfirmationForm
          type={modalConfig.type}
          onReset={handleClose}
          onSubmit={handleDelete}
        />
      );
    }

    return renderForm(
      {
        onSubmit: handleClose,
        onReset: handleClose,
        contentData: modalConfig.data,
      },
      modalConfig.modalType,
      modalConfig.type
    );
  };

  return (
    <div className="container">
      <h1>Variedades</h1>
      <SortsFilters
        onSortListGroupChange={setSortListGroup}
        onCreateBtnClick={(type) => {
          handleOpen("create", type, {});
        }}
        onDeleteBtnClick={() => {
          handleOpen("delete", SortListGroup.sort, {});
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
