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
}

// Define the initial state using that type
const initialState: CatalogState = {
  sortsSearch: {
    search: undefined,
    type: SortListGroup.sort,
  },
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
  },
});

export const { setSearch } = catalogSlice.actions;

export const selectSortsSearch = (state: RootState) =>
  state.catalog.sortsSearch;

export default catalogSlice.reducer;
