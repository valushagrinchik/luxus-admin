import { useParams } from "react-router-dom";
import { useGetPlantationQuery } from "../api/plantationsApi";
import { EditPlantationForm } from "../components/forms/EditPlantationForm/EditPlantationForm";

const EditPlantationPage = () => {
  let { plantationId } = useParams();

  const { data, isLoading } = useGetPlantationQuery(+(plantationId as string));

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!data) {
    return <div>Sin datos</div>;
  }

  return (
    <div className="container">
      <EditPlantationForm data={data} />
    </div>
  );
};
export default EditPlantationPage;
