import { useState } from "react";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import {
  EditBaseInput,
  EditPlantationFormMode,
  EditTransferDetailsInput,
} from "../../interfaces";
import { useFieldArray, useFormContext } from "react-hook-form";

import styles from "./TransferDetailsCRUDForm.module.css";
import { EditTransferDetailsForm } from "./components/EditTransferDetailsForm/EditTransferDetailsForm";
import L18nEs from "../../../../../lib/l18n";
import { FavouriteBox } from "../../../../../controls/FavouriteBox";
import { ViewIcon } from "../../../../../controls/icons/ViewIcon";

export const TransferDetailsCRUDForm = ({
  mode,
  legalEntitiesMap,
}: {
  mode: EditPlantationFormMode;
  legalEntitiesMap: EditBaseInput;
}) => {
  const disabled = mode === "preview";

  const { control } = useFormContext();
  const entities = useFieldArray({
    control,
    name: "transferDetails",
  });

  // const favourite = entities.fields.find((e: any) => e.favourite);

  const [open, setOpen] = useState(false);

  // data to create/edit in modal
  const [entity, setEntity] = useState<
    EditTransferDetailsInput | EditBaseInput
  >({});

  // mode to open modal in
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "create"
  );

  const handleOpen = (
    data: EditTransferDetailsInput | EditBaseInput,
    mode: "view" | "edit" | "create"
  ) => {
    setEntity(data);
    setModalMode(mode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const update = (data: EditTransferDetailsInput) => {
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
              onClick={() => handleOpen({}, "create")}
              className={styles.add_btn}
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
          renderCheckbox={(data) => (
            <FavouriteBox
              checked={data.favourite}
              onClick={() => {
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
          renderActions={(data) => (
            <>
              <ViewIcon
                className="action_icon"
                onClick={() => handleOpen(data, "view")}
              />
              <EditIcon
                className="action_icon"
                onClick={() => handleOpen(data, "edit")}
              />
              <BinIcon className="action_icon" onClick={() => remove(data)} />
            </>
          )}
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
