import { useParams } from "react-router-dom";
import { EditPlantationForm } from "../components/forms/EditPlantationForm/EditPlantationForm";
import { Mode } from "../lib/types";

const EditPlantationPage = () => {
  let { plantationId } = useParams();

  if (!plantationId) {
    return <>Identificación de plantación desconocida</>;
  }

  return (
    <div className="container">
      <EditPlantationForm plantationId={plantationId} mode={Mode.edit} />
    </div>
  );
};
export default EditPlantationPage;
