import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  PlantationsFiltersSearchByMap,
  SortListGroup,
} from "../../lib/constants";

// Define a type for the slice state
export interface CatalogState {
  sortsListPage: number;
  sortsListTotal: number;
  sortsGroupBy: SortListGroup | null;
  sortsToggleMap: Record<string, boolean>; // {group_1: true, category_1: false}, where boolean means isOpen
  sortsSearch: {
    search?: string;
    type: SortListGroup;
  };
  selectedSorts: number[];

  selectedPlantations: number[];
  plantationsListPage: number;
  plantationsListTotal: number;
  plantationsSearch: {
    search?: string;
    type: keyof typeof PlantationsFiltersSearchByMap;
  };
}

// Define the initial state using that type
const initialState: CatalogState = {
  sortsListPage: 1,
  sortsListTotal: 0,
  sortsGroupBy: null,
  sortsSearch: {
    search: undefined,
    type: SortListGroup.sort,
  },
  sortsToggleMap: {},
  selectedSorts: [],

  selectedPlantations: [],
  plantationsListPage: 1,
  plantationsListTotal: 0,
  plantationsSearch: {
    search: undefined,
    type: "name",
  },
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setSortsGroupBy: (
      state,
      action: PayloadAction<Partial<CatalogState["sortsGroupBy"]>>
    ) => {
      state.sortsGroupBy = action.payload;
    },
    setSortsSearch: (
      state,
      action: PayloadAction<Partial<CatalogState["sortsSearch"]>>
    ) => {
      state.sortsSearch = { ...state.sortsSearch, ...action.payload };
    },
    setSelectedSorts: (state, action: PayloadAction<number[]>) => {
      state.selectedSorts = [...action.payload];
    },

    setSortsToggleMap: (
      state,
      action: PayloadAction<Record<string, boolean>>
    ) => {
      state.sortsToggleMap = { ...state.sortsToggleMap, ...action.payload };
    },
    setSortsListPage: (state, action: PayloadAction<number>) => {
      state.sortsListPage = action.payload;
    },
    setSortsListTotal: (state, action: PayloadAction<number>) => {
      state.sortsListTotal = action.payload;
    },

    setSelectedPlantations: (state, action: PayloadAction<number[]>) => {
      state.selectedPlantations = [...action.payload];
    },
    setPlantationsListPage: (state, action: PayloadAction<number>) => {
      state.plantationsListPage = action.payload;
    },
    setPlantationsListTotal: (state, action: PayloadAction<number>) => {
      state.plantationsListTotal = action.payload;
    },
    setPlantationsSearch: (
      state,
      action: PayloadAction<Partial<CatalogState["plantationsSearch"]>>
    ) => {
      state.plantationsSearch = {
        ...state.plantationsSearch,
        ...action.payload,
      };
    },
  },
});

export const {
  setSortsGroupBy,
  setSortsSearch,
  setSelectedSorts,
  setSortsToggleMap,
  setSortsListPage,
  setSortsListTotal,

  setSelectedPlantations,
  setPlantationsListPage,
  setPlantationsListTotal,
  setPlantationsSearch,
} = catalogSlice.actions;

export const selectSortsGroupBy = (state: RootState) =>
  state.catalog.sortsGroupBy;

export const selectSortsSearch = (state: RootState) =>
  state.catalog.sortsSearch;

export const selectSelectedSorts = (state: RootState) =>
  state.catalog.selectedSorts;

export const selectSortsToggleMap = (state: RootState) =>
  state.catalog.sortsToggleMap;

export const selectSortsListPage = (state: RootState) =>
  state.catalog.sortsListPage;

export const selectSortsListTotal = (state: RootState) =>
  state.catalog.sortsListTotal;

export const selectSelectedPlantations = (state: RootState) =>
  state.catalog.selectedPlantations;

export const selectPlantationsListPage = (state: RootState) =>
  state.catalog.plantationsListPage;

export const selectPlantationsListTotal = (state: RootState) =>
  state.catalog.plantationsListTotal;

export const selectPlantationsSearch = (state: RootState) =>
  state.catalog.plantationsSearch;

export default catalogSlice.reducer;
