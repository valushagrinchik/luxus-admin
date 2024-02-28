import { useState } from "react";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import {
  EditBaseInput,
  EditTransferDetailsInput,
  EditPlantationInput,
} from "../../interfaces";
import { UseFieldArrayReturn } from "react-hook-form";
import { EditTransferDetailsForm } from "./components/EditTransferDetailsForm/EditTransferDetailsForm";
import L18nEs from "../../../../../lib/l18n";
import { FavouriteBox } from "../../../../../controls/FavouriteBox";
import { ViewIcon } from "../../../../../controls/icons/ViewIcon";
import { v4 as uuid } from "uuid";
import styles from "./TransferDetailsCRUDForm.module.css";
import { Mode } from "../../../../../lib/types";

export const TransferDetailsCRUDForm = ({
  mode,
  legalEntitiesMap,
  transferDetails: entities,
}: {
  mode: Mode;
  legalEntitiesMap: EditBaseInput;
  transferDetails: UseFieldArrayReturn<
    EditPlantationInput,
    "transferDetails",
    "id"
  >;
}) => {
  const disabled = mode === Mode.preview;

  const [open, setOpen] = useState(false);

  // data to create/edit in modal
  const [entity, setEntity] = useState<
    EditTransferDetailsInput | EditBaseInput
  >({});

  // mode to open modal in
  const [modalMode, setModalMode] = useState<Mode>(Mode.create);

  const handleOpen = (
    data: EditTransferDetailsInput | EditBaseInput,
    mode: Mode
  ) => {
    setEntity(data);
    setModalMode(mode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const update = async (data: EditTransferDetailsInput) => {
    if (entities.fields.find((entity) => entity.id === data.id)) {
      const result = [...entities.fields].map((entity) =>
        entity.id === data.id ? data : entity
      );
      entities.replace(result);
    } else {
      entities.append(data);
    }
    setOpen(false);
  };

  const remove = (data: EditTransferDetailsInput) => {
    const result = [
      ...entities.fields.filter((entity) => entity.id !== data.id),
    ];
    entities.replace(result);
  };

  const headers =
    L18nEs.pages.plantation.create.tabs.financial.transferDetailsBlock.table
      .headers;

  return (
    <>
      <div className={styles.title}>
        <h2>Transferencia</h2>
        <div className={styles.actions}>
          {!disabled && (
            <Button
              color="gray"
              onClick={() => handleOpen({ id: uuid() }, Mode.create)}
              className={styles.add_btn}
              disabled={!Object.keys(legalEntitiesMap).length}
            >
              <PlusIcon width={16} height={16} />
            </Button>
          )}
        </div>
      </div>
      {!!entities.fields.length && (
        <Table<EditTransferDetailsInput>
          headers={headers}
          data={entities.fields as EditTransferDetailsInput[]}
          renderCell={(key, value) => {
            if (key === "bankAccountType") {
              return L18nEs.constants.bankAccountTypes[
                value as keyof typeof L18nEs.constants.bankAccountTypes
              ];
            }
            return value || "-";
          }}
          renderCheckbox={(data) => (
            <FavouriteBox
              checked={data.favourite}
              onClick={() => {
                if (mode === Mode.preview) {
                  return;
                }
                entities.replace(
                  entities.fields
                    .map((e) =>
                      e.id === data.id
                        ? { ...e, favourite: true }
                        : { ...e, favourite: false }
                    )
                    .sort((x, y) => Number(y.favourite) - Number(x.favourite))
                );
              }}
            />
          )}
          renderActions={
            mode === Mode.preview
              ? (data) => (
                  <ViewIcon
                    className="action_icon"
                    onClick={() => handleOpen(data, Mode.preview)}
                  />
                )
              : (data) => (
                  <>
                    <ViewIcon
                      className="action_icon"
                      onClick={() => handleOpen(data, Mode.preview)}
                    />
                    <EditIcon
                      className="action_icon"
                      onClick={() => handleOpen(data, Mode.edit)}
                    />
                    <BinIcon
                      className="action_icon"
                      onClick={() => remove(data)}
                    />
                  </>
                )
          }
        />
      )}
      <Modal open={open} onClose={handleClose}>
        <EditTransferDetailsForm
          onReset={handleClose}
          onSubmit={update}
          data={entity}
          mode={modalMode}
          legalEntitiesMap={legalEntitiesMap}
        />
      </Modal>
    </>
  );
};
