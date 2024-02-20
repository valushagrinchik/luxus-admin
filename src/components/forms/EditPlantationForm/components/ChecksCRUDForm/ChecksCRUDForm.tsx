import { useState } from "react";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import {
  EditBaseInput,
  EditCheckInput,
  EditContactInput,
  EditPlantationInput,
  Mode,
} from "../../interfaces";
import { UseFieldArrayReturn, useFormContext } from "react-hook-form";
import { FavouriteBox } from "../../../../../controls/FavouriteBox";
import { EditCheckForm } from "./components/EditCheckForm/EditCheckForm";
import { v4 as uuid } from "uuid";

import L18nEs from "../../../../../lib/l18n";
import styles from "./ChecksCRUDForm.module.css";

export const ChecksCRUDForm = ({
  mode,
  legalEntitiesMap,
  checks: entities,
}: {
  mode: Mode;
  legalEntitiesMap: EditBaseInput;
  checks: UseFieldArrayReturn<EditPlantationInput, "checks", "id">;
}) => {
  const disabled = mode === Mode.preview;
  const { watch } = useFormContext();
  const country = watch("generalInfo.country");

  const [open, setOpen] = useState(false);

  // contact to create/edit in modal
  const [check, setCheck] = useState<EditContactInput | Record<string, any>>(
    {}
  );

  const handleOpen = (data: EditContactInput | Record<string, any>) => {
    setCheck(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const update = (data: EditCheckInput) => {
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

  const remove = (data: EditCheckInput) => {
    const result = [
      ...entities.fields.filter((entity) => entity.id !== data.id),
    ];
    entities.replace(result);
  };

  const headers =
    L18nEs.pages.plantation.create.tabs.financial.checksBlock.table.headers;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Cheques</h2>
        <div className={styles.actions}>
          {!disabled && (
            <Button
              color="gray"
              onClick={() => handleOpen({ id: uuid() })}
              className={styles.add_btn}
              disabled={!country}
            >
              <PlusIcon width={16} height={16} />
            </Button>
          )}
        </div>
      </div>
      {!!entities.fields.length && (
        <Table<EditCheckInput>
          headers={headers}
          data={entities.fields as EditCheckInput[]}
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
              ? undefined
              : (data) => {
                  return (
                    <>
                      <BinIcon
                        className="action_icon"
                        onClick={() => remove(data)}
                      />
                      <EditIcon
                        className="action_icon"
                        onClick={() => handleOpen(data)}
                      />
                    </>
                  );
                }
          }
        />
      )}
      <Modal open={open} onClose={handleClose}>
        <EditCheckForm
          onReset={handleClose}
          onSubmit={update}
          data={check}
          legalEntitiesMap={legalEntitiesMap}
          mode={mode}
        />
      </Modal>
    </div>
  );
};
