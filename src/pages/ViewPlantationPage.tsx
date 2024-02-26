import { useParams } from "react-router-dom";
import { EditPlantationForm } from "../components/forms/EditPlantationForm/EditPlantationForm";
import { Mode } from "../lib/types";

const ViewPlantationPage = () => {
  const { plantationId } = useParams();

  if (!plantationId) {
    return <>Identificación de plantación desconocida</>;
  }

  return (
    <div className="container">
      <EditPlantationForm plantationId={plantationId} mode={Mode.preview} />
    </div>
  );
};
export default ViewPlantationPage;
