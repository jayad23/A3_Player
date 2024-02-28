import { configureStore } from "@reduxjs/toolkit";
import prevSearchesReducer from "./prevSearches";
import playlistReducer from "./playlist";
import counterReducer from "./counter";
import menuReducer from "./navmenu";
import authReducer from "./auth";
import layout from "./layout";

export const store = configureStore({
	reducer: {
		layout: layout,
		menu: menuReducer,
		counter: counterReducer,
		playlist: playlistReducer,
		authentication: authReducer,
		prevSearches: prevSearchesReducer,
	},
});
