import { useEffect } from "react";
import { useAppSelector } from "../../../redux/store";
import { NoData } from "../../ui/NoData";
import {
  PlantationsListFetchDataProps,
  PlantationsListProps,
} from "../interfaces";
import { useSearchPlantationsQuery } from "../../../api/plantationsApi";
import { selectPlantationsSearch } from "../../../redux/reducer/catalogReducer";
import Box from "../../../controls/Box";

export const withData =
  (Component: React.FC<PlantationsListProps>) =>
  (props: PlantationsListFetchDataProps) => {
    const search = useAppSelector(selectPlantationsSearch);
    const { page, limit, refetch, filters } = props;

    const {
      data,
      refetch: searchPlantations,
      isLoading,
    } = useSearchPlantationsQuery({
      ...(search?.search ? { search } : {}),
      ...filters,
      offset: (page - 1) * limit,
      limit,
    });

    useEffect(() => {
      searchPlantations();
    }, [refetch, searchPlantations]);

    if (isLoading) {
      return <div>Cargando...</div>;
    }

    if (!data?.length && search.search) {
      return (
        <Box>
          <NoData />
        </Box>
      );
    }

    if (!data) {
      return <></>;
    }

    return <Component {...props} data={data} />;
  };
