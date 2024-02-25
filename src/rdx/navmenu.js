import { createSlice } from "@reduxjs/toolkit";
import { dictionary } from "constants/dictionary";

const initialState = {
	menuSelected: localStorage.getItem("menuSelected") || dictionary.music,
	menuOptions: [
		{
			name: dictionary.youtube,
			bg_default: "red",
			bg_hover: "black",
			disabled: false,
		},
		{
			name: dictionary.music,
			bg_default: "rgba(32,198,190,1)",
			bg_hover: "rgba(47,64,182,1)",
			disabled: false,
		},
		{
			name: dictionary.spotify,
			bg_default: "#288508",
			bg_hover: "#43d430",
			disabled: true,
		},
	],
};

export const navmenu = createSlice({
	name: "navigation",
	initialState,
	reducers: {
		onSelectMenu: (state, { payload }) => {
			localStorage.setItem("menuSelected", payload);
			state.menuSelected = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onSelectMenu } = navmenu.actions;

export default navmenu.reducer;
