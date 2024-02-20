import { EditPlantationForm } from "../components/forms/EditPlantationForm/EditPlantationForm";
import { Mode } from "../components/forms/EditPlantationForm/interfaces";
import { v4 as uuid } from "uuid";
const CreatePlantationPage = () => {
  return (
    <div className="container">
      <EditPlantationForm mode={Mode.create} plantationId={uuid()} />
    </div>
  );
};
export default CreatePlantationPage;
