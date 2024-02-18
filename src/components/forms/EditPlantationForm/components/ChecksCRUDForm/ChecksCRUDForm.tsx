import { useState } from "react";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import {
  EditCheckInput,
  EditContactInput,
  EditPlantationFormMode,
} from "../../interfaces";
import { useFieldArray, useFormContext } from "react-hook-form";

import styles from "./ChecksCRUDForm.module.css";
import { EditCheckForm } from "./components/EditCheckForm/EditCheckForm";
import L18nEs from "../../../../../lib/l18n";
import { FavouriteBox } from "../../../../../controls/FavouriteBox";

export const ChecksCRUDForm = ({ mode }: { mode: EditPlantationFormMode }) => {
  const disabled = mode === "preview";
  const { control } = useFormContext();
  const entities = useFieldArray({
    control,
    name: "checks",
  });

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
    <>
      <div className={styles.title}>
        <h2>Cheques</h2>
        <div className={styles.actions}>
          {!disabled && (
            <Button
              color="gray"
              onClick={() => handleOpen({})}
              className={styles.add_btn}
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
              <BinIcon className="action_icon" onClick={() => remove(data)} />
              <EditIcon
                className="action_icon"
                onClick={() => handleOpen(data)}
              />
            </>
          )}
        />
      )}
      <Modal open={open} onClose={handleClose}>
        <EditCheckForm onReset={handleClose} onSubmit={update} data={check} />
      </Modal>
    </>
  );
};
