import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loggedin: false,
	loggedout: true,
	username: null,
	avatar: null,
	userId: localStorage.getItem("userId") || null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authorize: (state, { payload }) => {
			state.loggedin = true;
			state.avatar = payload.avatar;
			state.username = payload.username;
			state.loggedout = false;
			state.userId = payload.userId;
			localStorage.setItem("jwt", payload.token);
			localStorage.setItem("userId", payload.userId);
		},
		logout: (state) => {
			state.avatar = null;
			state.username = null;
			state.loggedin = false;
			state.loggedout = true;
			state.userId = null;
			localStorage.removeItem("jwt");
		},
		// incrementByAmount: (state, action) => {
		// 	state.value += action.payload;
		// },
	},
});

// Action creators are generated for each case reducer function
export const { authorize, logout } = authSlice.actions;

export default authSlice.reducer;
