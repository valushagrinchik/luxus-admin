import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { SortListGroup } from "../../lib/constants";

// Define a type for the slice state
export interface CatalogState {
  sortsSearch: {
    search?: string;
    type: SortListGroup;
  };
  selectedSorts: number[];
}

// Define the initial state using that type
const initialState: CatalogState = {
  sortsSearch: {
    search: undefined,
    type: SortListGroup.sort,
  },
  selectedSorts: [],
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setSearch: (
      state,
      action: PayloadAction<Partial<CatalogState["sortsSearch"]>>
    ) => {
      state.sortsSearch = { ...state.sortsSearch, ...action.payload };
      
    },
    setSelectedSorts: (state, action: PayloadAction<number[]>) => {
      state.selectedSorts = [...action.payload];
    },
  },
});

export const { setSearch, setSelectedSorts } = catalogSlice.actions;

export const selectSortsSearch = (state: RootState) =>
  state.catalog.sortsSearch;

export const selectSelectedSorts = (state: RootState) =>
  state.catalog.selectedSorts;

export default catalogSlice.reducer;
