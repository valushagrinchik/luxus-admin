export enum SortListGroup {
  group = "group",
  category = "category",
  sort = "sort",
}

export const ErrorMessages = {
  reqiuredField: "Campo obligatorio",
  invalidEmail: "El correo electrónico debe ser un correo electrónico válido",
  somethingWentWrong: "Algo salió mal",
  USER_NOT_FOUND: "Usuario o contraseña incorrectos",
};

export const SortsFiltersGroupByMap = {
  [SortListGroup.group]: "Ocultar todo",
  [SortListGroup.category]: "Mostrar hasta categorias",
  [SortListGroup.sort]: "Mostrar todo",
};

export const SortsFiltersSearchByMap = {
  [SortListGroup.group]: "Por grupo",
  [SortListGroup.category]: "Por categoria",
  [SortListGroup.sort]: "Por variedad",
};

export const PlantationsFiltersSearchByMap = {
  name: "Por nombre comercial",
  legalEntityName: "Por razón social",
};

export const SortsFiltersCreateOptions = [
  {
    label: "Crear grupo",
    value: SortListGroup.group,
  },
  {
    label: "Crear categoria",
    value: SortListGroup.category,
  },
  {
    label: "Crear variedad",
    value: SortListGroup.sort,
  },
];

export const HEADER_TITLES = {
  sorts: "Variedades",
  plantations: "Fincas",
};

export enum PlantationDepartment {
  FINANCIAL = "FINANCIAL",
  SALES = "SALES",
}

export const AdminConfirmationFormTitles: Record<SortListGroup, string> = {
  [SortListGroup.group]:
    "¿Estás seguro de que deseas eliminar de forma permanente el grupo de la plataforma?",
  [SortListGroup.category]:
    "¿Estás seguro de que deseas eliminar de forma permanente la categoría de la plataforma?",
  [SortListGroup.sort]:
    "¿Estás seguro de que deseas eliminar de forma permanente la variedad de la plataforma?",
};

export const AdminConfirmationFormPlantationTitle =
  "¿Estás seguro de que deseas eliminar de forma permanente a la finca  de la plataforma?";

export const LIST_LIMIT = 20;
export const SORTS_LIST_LIMIT = LIST_LIMIT;
export const PLANTATIONS_LIST_LIMIT = LIST_LIMIT;

export const SHARED_ADDRESS_KEY = "legalAddress";
