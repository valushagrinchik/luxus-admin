import { useState } from "react";
import Box from "../../../../../controls/Box";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import { EditContactForm } from "./components/EditContactForm/EditContactForm";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import {
  EditBaseInput,
  EditContactInput,
  EditPlantationInput,
  Mode,
} from "../../interfaces";
import {
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { v4 as uuid } from "uuid";

import L18nEs from "../../../../../lib/l18n";
import styles from "./ContactsCRUDForm.module.css";
import { PlantationDepartment } from "../../../../../lib/constants";

export const ContactsCRUDForm = ({
  contactFieldKey,
  positions,
  department,
  mode,
}: {
  contactFieldKey: string;
  positions: Record<string, string>;
  department: PlantationDepartment;
  mode: Mode;
}) => {
  const texts = L18nEs.shared.contactsBlock;

  const { control, watch } = useFormContext();
  const contacts = useFieldArray({
    control,
    name: contactFieldKey,
  });

  watch(contactFieldKey);

  const disabled = mode === Mode.preview;

  const [open, setOpen] = useState(false);

  // contact to create/edit in modal
  const [contact, setContact] = useState<EditContactInput | EditBaseInput>({});

  const handleOpen = (data: EditContactInput | EditBaseInput) => {
    setContact(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateContact = async (data: EditContactInput) => {
    if (contacts.fields.find((contact) => contact.id === data.id)) {
      const result = [...contacts.fields].map((entity) =>
        entity.id === data.id ? data : entity
      );
      contacts.replace(result);
    } else {
      contacts.append(data);
    }

    setOpen(false);
  };

  const deleteContact = (data: EditContactInput) => {
    const result = [
      ...contacts.fields.filter((contact) => contact.id !== data.id),
    ];
    contacts.replace(result);
  };

  return (
    <div className={styles.container}>
      <Box>
        <div className={styles.title}>
          <h2>{texts.title}</h2>
          <div className={styles.actions}>
            {!disabled && (
              <Button
                color="gray"
                onClick={() => handleOpen({ id: uuid() })}
                className={styles.add_btn}
              >
                <PlusIcon width={16} height={16} />
              </Button>
            )}
          </div>
        </div>
        {!!contacts.fields.length && (
          <Table<EditContactInput>
            headers={texts.table.headers}
            data={contacts.fields as EditContactInput[]}
            renderActions={
              mode === Mode.preview
                ? undefined
                : (data) => (
                    <>
                      <BinIcon
                        className="action_icon"
                        onClick={() => deleteContact(data)}
                      />

                      <EditIcon
                        className="action_icon"
                        onClick={() => handleOpen(data)}
                      />
                    </>
                  )
            }
          />
        )}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <EditContactForm
          onReset={handleClose}
          onSubmit={updateContact}
          data={contact}
          positions={positions}
          mode={mode}
          department={department}
        />
      </Modal>
    </div>
  );
};
