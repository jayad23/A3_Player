import "./index.css";
import React from "react";
import { store } from "rdx/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./AppRouter";
import { Toaster } from "react-hot-toast";
import { ThemeContext } from "./ThemeContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";
//import reportWebVitals from './reportWebVitals';

const themeOptions = {
	palette: {
		type: "light",
		primary: {
			main: "#020202",
		},
		secondary: {
			main: "#d0dedb",
			contrastText: "#25293C",
		},
		background: {
			default: "#f5f5f5",
			paper: "#d0dedb",
		},
	},
};

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeContext.Provider value={{ mode: "light" }}>
				<ThemeProvider theme={theme}>
					<CssBaseline enableColorScheme />
					<Toaster position="top-center" reverseOrder={false} />
					<BrowserRouter>
						<AppRouter />
					</BrowserRouter>
				</ThemeProvider>
			</ThemeContext.Provider>
		</Provider>
	</React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
