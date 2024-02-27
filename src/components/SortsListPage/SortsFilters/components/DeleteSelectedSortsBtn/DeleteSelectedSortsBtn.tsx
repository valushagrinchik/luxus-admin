import { useState } from "react";
import { useDeleteSortMutation } from "../../../../../api/sortsApi";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { useWS } from "../../../../../hooks/useWS";
import { useAuth } from "../../../../../lib/auth";
import { AdminConfirmationFormTitles } from "../../../../../lib/constants";
import {
  selectSelectedSorts,
  setSelectedSorts,
} from "../../../../../redux/reducer/catalogReducer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { AdminConfirmationForm } from "../../../../forms/AdminConfirmationForm/AdminConfirmationForm";
import { ConfirmationForm } from "../../../../forms/ConfirmationForm/ConfirmationForm";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { ModelType, SharedActionType } from "../../../../../lib/types";

export const DeleteSelectedSortsBtn = () => {
  const { isAdmin } = useAuth();
  const appDispatch = useAppDispatch();
  const selectedSorts = useAppSelector(selectSelectedSorts);
  const [open, setOpen] = useState(false);
  const { emitEvent } = useWS();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteSort] = useDeleteSortMutation();

  const handleDelete = async () => {
    const deletePromises = selectedSorts.map((id) => {
      return deleteSort(id);
    });
    await Promise.allSettled(deletePromises);
    emitEvent({
      type: ModelType.Sort,
      id: selectedSorts,
      action: SharedActionType.delete,
    });
    appDispatch(setSelectedSorts([]));

    handleClose();
  };

  return (
    <>
      <Button
        color="red"
        disabled={!selectedSorts.length}
        onClick={() => handleOpen()}
        style={{ padding: "10px", height: "36px" }}
      >
        <BinIcon
          color={
            !selectedSorts.length ? "var(--Gray-400)" : "var(--Base-White)"
          }
        />
      </Button>
      <Modal open={open} onClose={handleClose}>
        {isAdmin && (
          <AdminConfirmationForm
            title={AdminConfirmationFormTitles.sort}
            onReset={handleClose}
            onSubmit={handleDelete}
          />
        )}
        {!isAdmin && (
          <ConfirmationForm onReset={handleClose} onSubmit={handleDelete} />
        )}
      </Modal>
    </>
  );
};
