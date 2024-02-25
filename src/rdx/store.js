import { configureStore } from "@reduxjs/toolkit";
import prevSearchesReducer from "./prevSearches";
import playlistReducer from "./playlist";
import counterReducer from "./counter";
import menuReducer from "./navmenu";
import authReducer from "./auth";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		authentication: authReducer,
		menu: menuReducer,
		prevSearches: prevSearchesReducer,
		playlist: playlistReducer,
	},
});
