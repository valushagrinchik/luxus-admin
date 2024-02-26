import { EditPlantationForm } from "../components/forms/EditPlantationForm/EditPlantationForm";
import { v4 as uuid } from "uuid";
import { Mode } from "../lib/types";
const CreatePlantationPage = () => {
  return (
    <div className="container">
      <EditPlantationForm mode={Mode.create} plantationId={uuid()} />
    </div>
  );
};
export default CreatePlantationPage;
