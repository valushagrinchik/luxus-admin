export enum SortListGroup {
  group = "group",
  category = "category",
  sort = "sort",
}

export const ErrorMessages = {
  reqiuredField: "Campo obligatorio",
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
