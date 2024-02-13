export enum SortListGroup {
  group = "group",
  category = "category",
  sort = "sort",
}

export const ErrorMessages = {
  reqiuredField: "Campo obligatorio",
};

export const SortsFiltersGroupByOptions = [
  {
    label: "Ocultar todo",
    value: SortListGroup.group,
  },
  {
    label: "Mostrar hasta categorias",
    value: SortListGroup.category,
  },
  {
    label: "Mostrar todo",
    value: SortListGroup.sort,
  },
];

export const SortsFiltersSearchByOptions = [
  {
    label: "Por variedad ",
    value: SortListGroup.sort,
  },
  {
    label: "Por categoria",
    value: SortListGroup.category,
  },
  {
    label: "Por grupo",
    value: SortListGroup.group,
  },
];

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
