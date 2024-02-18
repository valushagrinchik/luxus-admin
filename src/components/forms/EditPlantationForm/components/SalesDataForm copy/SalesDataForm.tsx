import { useState } from "react";
import Box from "../../../../../controls/Box";
import { Button } from "../../../../../controls/Button/Button";
import { Modal } from "../../../../../controls/Modal";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import styles from "./SalesDataForm.module.css";
import { EditContactForm } from "../ContactsCRUDForm/components/EditContactForm/EditContactForm";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import { EditBaseInput, EditContactInput } from "../../interfaces";

import { useFieldArray, useFormContext } from "react-hook-form";

export const SalesDataForm = () => {
  const { control } = useFormContext();
  const contacts = useFieldArray({
    control,
    name: "salesContacts",
  });

  const [open, setOpen] = useState(false);

  // contact to create/edit in modal
  const [contact, setContact] = useState<
    EditContactInput | EditBaseInput
  >({});

  const handleOpen = (data: EditContactInput | EditBaseInput) => {
    setContact(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateContact = (data: EditContactInput) => {
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

  const headers = {
    name: "Nombre",
    email: "Email",
    whatsapp: "Whatsapp",
    telegram: "Telegram",
    skype: "Skype",
    position: "Cargo",
  };

  return (
    <div className={styles.container}>
      <Box>
        <div className={styles.title}>
          <h2>Contactos</h2>
          <div className={styles.actions}>
            <Button
              color="gray"
              onClick={() => handleOpen({})}
              className={styles.add_btn}
            >
              <PlusIcon width={16} height={16} />
            </Button>
          </div>
        </div>
        {!!contacts.fields.length && (
          <Table<EditContactInput>
            headers={headers}
            data={contacts.fields as EditContactInput[]}
            renderActions={(data) => (
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
            )}
          />
        )}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <EditContactForm
          onReset={handleClose}
          onSubmit={updateContact}
          data={contact}
        />
      </Modal>
    </div>
  );
};
