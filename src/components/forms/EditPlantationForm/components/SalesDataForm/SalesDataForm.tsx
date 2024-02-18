import { EditPlantationFormMode } from "../../interfaces";
import { ContactsCRUDForm } from "../ContactsCRUDForm/ContactsCRUDForm";

export const SalesDataForm = ({ mode }: { mode: EditPlantationFormMode }) => {
  return <ContactsCRUDForm contactFieldKey="salesContacts" mode={mode} />;
};
