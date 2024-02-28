import { useEffect, useState } from "react";
import { PlantationsFilters } from "../components/PlantationsFilters/PlantationsFilters";
import { PaginatedPlantationsList } from "../components/PlantationsList/PlantationsList";
import { Modal } from "../controls/Modal";
import { ModelType, PlantationFilters, SharedActionType } from "../lib/types";
import { ConfirmationForm } from "../components/forms/ConfirmationForm/ConfirmationForm";
import {
  useCancelPlantationMutation,
  useDeletePlantationMutation,
} from "../api/plantationsApi";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  selectSelectedPlantations,
  setSelectedPlantations,
} from "../redux/reducer/catalogReducer";
import { AdminConfirmationForm } from "../components/forms/AdminConfirmationForm/AdminConfirmationForm";
import { useNavigate } from "react-router-dom";
import {
  AdminConfirmationFormPlantationTitle,
  PLANTATIONS_LIST_LIMIT,
} from "../lib/constants";
import { useAuth } from "../lib/auth";
import { useWS } from "../hooks/useWS";
import { useRefetch } from "../hooks/useRefetch";

type ModalType = "create" | "update" | "delete" | "admin_approve";

const PlantationsListPage = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  const { refetch, triggerRefetch } = useRefetch();

  const [modalConfig, setModalConfig] = useState<{
    modalType: ModalType;
    data: any;
  } | null>(null);

  const { event, emitEvent } = useWS();
  useEffect(() => {
    if (event && [ModelType.Plantation].includes(event.type)) {
      triggerRefetch();
    }
  }, [event]);

  const [filters, setFilters] = useState<PlantationFilters | null>(null);
  const selectedPlantations = useAppSelector(selectSelectedPlantations);

  const [deletePlantation] = useDeletePlantationMutation();
  const [cancelPlantation] = useCancelPlantationMutation();

  const handleOpen = (modalType: ModalType, data: any) => {
    setModalConfig({
      modalType,
      data,
    });
    setOpen(true);
  };
  const handleClose = () => {
    triggerRefetch();
    setOpen(false);
  };

  const handleDelete = async () => {
    const promises = selectedPlantations.map((id) => deletePlantation(id));
    await Promise.allSettled(promises);
    appDispatch(setSelectedPlantations([]));
    emitEvent({
      type: ModelType.Plantation,
      id: selectedPlantations,
      action: SharedActionType.delete,
    });
    handleClose();
  };

  const handleAdminDelete = async () => {
    await deletePlantation(modalConfig?.data.id);
    emitEvent({
      type: ModelType.Plantation,
      id: [modalConfig?.data.id],
      action: SharedActionType.admin_approve,
    });
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
          title={AdminConfirmationFormPlantationTitle}
          onReset={handleClose}
          onSubmit={handleAdminDelete}
        />
      );
    }
  };

  const actions = {
    onShow: async (data: any) => {
      navigate(`/plantations/${data.id}`);
    },
    onEdit: async (data: any) => {
      navigate(`/plantations/${data.id}/edit`);
    },
    onCancel: async (data: any) => {
      await cancelPlantation(data.id);
      emitEvent({
        type: ModelType.Plantation,
        id: [data.id],
        action: SharedActionType.cancel,
      });
    },
    onAdminRefuse: async (data: any) => {
      await cancelPlantation(data.id);
      emitEvent({
        type: ModelType.Plantation,
        id: [data.id],
        action: SharedActionType.admin_refuse,
      });
    },
    onAdminApprove: async (data: any) => {
      handleOpen("admin_approve", data);
    },
  };

  const filterActions = {
    onChange: setFilters,
    onCreateBtnClick: () => {
      navigate("/plantations/create");
    },
    onDeleteBtnClick: async () => {
      if (isAdmin) {
        await handleDelete();
        return;
      }
      handleOpen("delete", {});
    },
  };
  return (
    <div className="container">
      <h1>Fincas</h1>

      <PlantationsFilters filters={filters} actions={filterActions} />
      <PaginatedPlantationsList
        refetch={refetch.current}
        filters={filters}
        actions={actions}
        limit={PLANTATIONS_LIST_LIMIT}
      />
      <Modal open={open} onClose={handleClose}>
        {renderActionForm()}
      </Modal>
    </div>
  );
};
export default PlantationsListPage;
