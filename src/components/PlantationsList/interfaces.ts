import { PlantationThin, PlantationFilters } from "../../lib/types";

export type PlantationsListProps = {
  // filters: PlantationFilters | null;
  actions: {
    onShow: (data: any) => Promise<void>;
    onEdit: (data: any) => Promise<void>;
    onCancel: (data: any) => Promise<void>;
    onAdminRefuse: (data: any) => Promise<void>;
    onAdminApprove: (data: any) => Promise<void>;
  };
  data: PlantationThin[];
  // refetch?: boolean;
};

export type PlantationsListFetchDataProps = Omit<
  PlantationsListProps,
  "data"
> & {
  filters: PlantationFilters | null;
  refetch?: boolean;
  limit: number;
  page: number;
};

export type PlantationsListPaginatedProps = Omit<
  PlantationsListProps,
  "data"
> & {
  filters: PlantationFilters | null;
  refetch?: boolean;
  limit?: number;
};
