import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	searchValues: [],
	values: {},
	openOptionModal: false,
};

export const prevSearches = createSlice({
	name: "prevSearches",
	initialState,
	reducers: {
		onPopulateSearches: (state, { payload }) => {
			state.values = payload.values;
			state.searchValues = payload.searchValues;
			state.openOptionModal = true;
		},
		onToggleSearchesModal: (state, { payload }) => {
			state.openOptionModal = payload;
		},
	},
});
export const { onPopulateSearches, onToggleSearchesModal } = prevSearches.actions;

export default prevSearches.reducer;
