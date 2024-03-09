import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showTop: true,
	showBottom: true,
	middleLeftGlassedColumn: {},
	middleRightGlassedColumn: {},
	musicLeftContainer: {},
	videoPlayerStyles: {
		height: "46.5vh", //38.5vh
		position: "relative",
	},
	playingInformation: {
		currentSong: {},
		songsCard: {},
	},
	revertPlaylistWithSearch: false,
};

export const layoutSlice = createSlice({
	name: "layout",
	initialState,
	reducers: {
		onChangeLayout: (state) => {
			state.showTop = false;
			state.showBottom = false;
			state.middleLeftGlassedColumn = {
				display: "none",
			};
			state.middleRightGlassedColumn = {
				width: "100%",
				height: "100vh",
			};
			state.musicLeftContainer = {
				width: "83%",
			};
			state.videoPlayerStyles = {
				height: "97vh",
				position: "relative",
			};
			state.playingInformation = {
				currentSong: {
					display: "none",
				},
				songsCard: {
					display: "none",
				},
			};
			state.revertPlaylistWithSearch = true;
		},
		onRevertToOriginalLayout: (state) => {
			state.showTop = true;
			state.showBottom = true;
			state.middleLeftGlassedColumn = {};
			state.middleRightGlassedColumn = {};
			state.musicLeftContainer = {};
			state.videoPlayerStyles = {
				height: "46.5vh",
				position: "relative",
			};
			state.playingInformation = {
				currentSong: {},
				songsCard: {},
			};
			state.revertPlaylistWithSearch = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onChangeLayout, onRevertToOriginalLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
