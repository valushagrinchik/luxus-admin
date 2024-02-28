import { useEffect, useState } from "react";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import {
  EditBaseInput,
  EditLegalEntityInput,
  EditPlantationInput,
} from "../../interfaces";
import { UseFieldArrayReturn, useFormContext } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { EditLegalEntityForm } from "./components/EditLegalEntityForm/EditLegalEntityForm";
import styles from "./LegalEntitiesCRUDForm.module.css";
import { CountryCode, ListActionType, Mode } from "../../../../../lib/types";
import { AdminConfirmationForm } from "../../../AdminConfirmationForm/AdminConfirmationForm";
import { SHARED_ADDRESS_KEY } from "../../../../../lib/constants";

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

  // entity to create/edit in modal
  const [legalEntity, setLegalEntity] = useState<
    EditLegalEntityInput | EditBaseInput
  >();

  const { watch } = useFormContext();
  const country = watch("generalInfo.country");

  // mode to open modal in
  const [modalMode, setModalMode] = useState<
    Mode.create | Mode.edit | ListActionType.delete | null
  >(null);

  const handleOpen = (
    data: EditLegalEntityInput | EditBaseInput,
    mode: Mode.create | Mode.edit | ListActionType.delete
  ) => {
    setLegalEntity(data);
    setModalMode(mode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const update = (data: EditLegalEntityInput) => {
    if (legalEntities.fields.find((entity) => entity.id === data.id)) {
      const result = [...legalEntities.fields].map((entity) =>
        entity.id === data.id ? data : entity
      );

      legalEntities.replace(result);
      transferDetails.replace(
        [...transferDetails.fields].map((tr) =>
          tr.plantationLegalEntityId === data.id && tr.name === tr.beneficiary
            ? { ...tr, beneficiaryAddress: data[SHARED_ADDRESS_KEY] }
            : tr
        )
      );
    } else {
      legalEntities.append(data);
      transferDetails.append({
        id: uuid(),
        name: data.name,
        beneficiary: data.name,
        beneficiaryAddress: data[SHARED_ADDRESS_KEY],
        favourite: !legalEntities.fields.length,
        bank: "",
        bankAccountNumber: "",
        bankAccountType: "",
        plantationLegalEntityId: data.id,
      });
      if (country !== CountryCode.co) {
        checks.append({
          id: uuid(),
          name: data.name,
          beneficiary: data.name,
          favourite: !legalEntities.fields.length,
          plantationLegalEntityId: data.id,
        });
      }
    }

    setOpen(false);
  };

  const deleteLegalEntity = (data: EditLegalEntityInput) => {
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

  const handleDeleteBtnClick = (data: EditLegalEntityInput) => {
    setLegalEntity(data);
    setModalMode(ListActionType.delete);
    setOpen(true);
  };

  const renderModalContent = () => {
    if (!legalEntity) {
      return;
    }
    if (modalMode === ListActionType.delete) {
      return (
        <AdminConfirmationForm
          title={
            <>
              <span style={{ color: "var(--Red-500, #F04438)" }}>
                Advertencia
              </span>
              : Se borrarán todos los datos asociados. ¿Proceder?
            </>
          }
          onSubmit={() =>
            deleteLegalEntity(legalEntity as EditLegalEntityInput)
          }
          onReset={handleClose}
        />
      );
    }

    return (
      <EditLegalEntityForm
        onReset={handleClose}
        onSubmit={update}
        data={legalEntity}
        mode={modalMode as Mode}
      />
    );
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
              onClick={() => handleOpen({ id: uuid() }, Mode.create)}
              className={styles.add_btn}
              disabled={!country}
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
                      onClick={() => handleDeleteBtnClick(data)}
                    />

                    <EditIcon
                      className="action_icon"
                      onClick={() => handleOpen(data, Mode.edit)}
                    />
                  </>
                )
              : undefined
          }
        />
      )}

      <Modal open={open} onClose={handleClose}>
        {renderModalContent()}
      </Modal>
    </>
  );
};
