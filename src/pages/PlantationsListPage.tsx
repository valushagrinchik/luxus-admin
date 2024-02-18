import { useState } from "react";
import { PlantationsFilters } from "../components/PlantationsFilters/PlantationsFilters";
import { PlantationsList } from "../components/PlantationsList/PlantationsList";
import { Modal } from "../controls/Modal";
import { PlantationFilters } from "../lib/types";
import { ConfirmationForm } from "../components/forms/ConfirmationForm/ConfirmationForm";
import {
  useCancelPlantationMutation,
  useDeletePlantationMutation,
} from "../api/plantationsApi";
import { useAppSelector } from "../store";
import { selectSelectedPlantations } from "../redux/reducer/catalogReducer";
import { AdminConfirmationForm } from "../components/forms/AdminConfirmationForm/AdminConfirmationForm";
import { useNavigate } from "react-router-dom";
import { AdminConfirmationFormPlantationTitle } from "../lib/constants";

type ModalType = "create" | "update" | "delete" | "admin_approve";

const PlantationsListPage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    modalType: ModalType;
    data: any;
  } | null>(null);

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
    setRefetch(true);
    setOpen(false);
  };

  const handleDelete = async () => {
    const promises = selectedPlantations.map((id) => deletePlantation(id));
    await Promise.allSettled(promises);
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
          onSubmit={handleDelete}
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
    },
    onAdminRefuse: async (data: any) => {
      await cancelPlantation(data.id);
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
    onDeleteBtnClick: () => {
      handleOpen("delete", {});
    },
  };

  return (
    <div className="container">
      <h1>Fincas</h1>

      <PlantationsFilters filters={filters} actions={filterActions} />
      <PlantationsList refetch={refetch} filters={filters} actions={actions} />
      <Modal open={open} onClose={handleClose}>
        {renderActionForm()}
      </Modal>
    </div>
  );
};
export default PlantationsListPage;
