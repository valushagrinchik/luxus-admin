import { useParams } from "react-router-dom";
import { useGetPlantationQuery } from "../api/plantationsApi";
import { EditPlantationForm } from "../components/forms/EditPlantationForm/EditPlantationForm";

const ViewPlantationPage = () => {
  const { plantationId } = useParams();

  const { data, isLoading } = useGetPlantationQuery(+(plantationId as string));

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!data) {
    return <div>Sin datos</div>;
  }

  return (
    <div className="container">
      <EditPlantationForm data={data} mode="preview" />
    </div>
  );
};
export default ViewPlantationPage;
