import { useState } from "react";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import {
  EditLegalEntityInput,
  EditPlantationInput,
  Mode,
} from "../../interfaces";
import { UseFieldArrayReturn, useFormContext } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { EditLegalEntityForm } from "./components/EditLegalEntityForm/EditLegalEntityForm";
import styles from "./LegalEntitiesCRUDForm.module.css";
import { CountryCode } from "../../../../../lib/types";
import { AdminConfirmationForm } from "../../../AdminConfirmationForm/AdminConfirmationForm";

type ModalType = "editEntity" | "confirmDelete";

export const LegalEntitiesCRUDForm = ({
  mode,
  checks,
  legalEntities,
  transferDetails,
}: {
  mode: Mode;
  checks: UseFieldArrayReturn<EditPlantationInput, "checks", "id">;
  legalEntities: UseFieldArrayReturn<
    EditPlantationInput,
    "legalEntities",
    "id"
  >;
  transferDetails: UseFieldArrayReturn<
    EditPlantationInput,
    "transferDetails",
    "id"
  >;
}) => {
  const disabled = mode === Mode.preview;
  const [open, setOpen] = useState(false);
  // contact to create/edit in modal
  const [legalEntity, setLegalEntity] = useState<EditLegalEntityInput>();
  const [modalType, setModalType] = useState<ModalType>();

  const { watch } = useFormContext();
  const country = watch("generalInfo.country");

  const openModal = (type: ModalType, data: any) => {
    setModalType(type);
    setLegalEntity(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateLegalEntity = (data: EditLegalEntityInput) => {
    if (legalEntities.fields.find((entity) => entity.id === data.id)) {
      const result = [...legalEntities.fields].map((entity) =>
        entity.id === data.id ? data : entity
      );

      legalEntities.replace(result);
    } else {
      legalEntities.append(data);
      transferDetails.append({
        id: uuid(),
        name: data.name,
        beneficiary: data.name,
        beneficiaryAddress: data.legalAddress,
        favourite: !legalEntities.fields.length,
        bank: "",
        bankAccountNumber: "",
        bankAccountType: "",

        // plantationId: data.plantationId,
        plantationLegalEntityId: data.id,
      });
      checks.append({
        id: uuid(),
        name: data.name,
        beneficiary: data.name,
        favourite: !legalEntities.fields.length,

        // plantationId: data.plantationId,
        plantationLegalEntityId: data.id,
      });
    }

    setOpen(false);
  };

  const deleteLegalEntity = (data?: EditLegalEntityInput) => {
    if (!data) {
      return;
    }

    legalEntities.replace([
      ...legalEntities.fields.filter((entity) => entity.id !== data.id),
    ]);

    transferDetails.replace([
      ...transferDetails.fields.filter(
        (entity) => entity.plantationLegalEntityId !== data.id
      ),
    ]);

    checks.replace([
      ...checks.fields.filter(
        (entity) => entity.plantationLegalEntityId !== data.id
      ),
    ]);
  };

  const headers = {
    name: "Razón Social",
    code: country === CountryCode.ec ? "Ruc o cédula" : "NIT",
    legalAddress: "Domicilio tributario",
    actualAddress: "Domicilio real",
  };
  return (
    <>
      <div className={styles.title}>
        <h2>Datos generales</h2>
        <div className={styles.actions}>
          {!disabled && (
            <Button
              color="gray"
              disabled={!country}
              onClick={() => openModal("editEntity", { id: uuid() })}
              className={styles.add_btn}
            >
              <PlusIcon width={16} height={16} />
            </Button>
          )}
        </div>
      </div>

      {!!legalEntities.fields.length && (
        <Table<EditLegalEntityInput>
          headers={headers}
          data={legalEntities.fields as EditLegalEntityInput[]}
          renderActions={
            mode !== Mode.preview
              ? (data) => (
                  <>
                    <BinIcon
                      className="action_icon"
                      // onClick={() => deleteLegalEntity(data)}
                      onClick={() => openModal("confirmDelete", data)}
                    />

                    <EditIcon
                      className="action_icon"
                      onClick={() => openModal("editEntity", data)}
                    />
                  </>
                )
              : undefined
          }
        />
      )}

      <Modal open={open} onClose={handleClose}>
        {modalType === "confirmDelete" && (
          <AdminConfirmationForm
            title={
              <>
                <span style={{ color: "var(--Red-500, #F04438)" }}>
                  Advertencia
                </span>
                : Se borrarán todos los datos asociados. ¿Proceder?
              </>
            }
            onSubmit={() => deleteLegalEntity(legalEntity)}
            onReset={handleClose}
          />
        )}
        {modalType === "editEntity" && (
          <EditLegalEntityForm
            onReset={handleClose}
            onSubmit={updateLegalEntity}
            data={legalEntity}
            mode={mode}
          />
        )}
      </Modal>
    </>
  );
};
