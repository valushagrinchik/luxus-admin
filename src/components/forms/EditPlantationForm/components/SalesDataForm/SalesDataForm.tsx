import { PlantationDepartment } from "../../../../../lib/constants";
import L18nEs from "../../../../../lib/l18n";
import { Mode } from "../../interfaces";
import { ContactsCRUDForm } from "../ContactsCRUDForm/ContactsCRUDForm";

export const SalesDataForm = ({ mode }: { mode: Mode }) => {
  return (
    <ContactsCRUDForm
      contactFieldKey="salesContacts"
      mode={mode}
      positions={L18nEs.constants.salesPositions}
      department={PlantationDepartment.SALES}
    />
  );
};
