import { createSlice } from "@reduxjs/toolkit";
import { getRandomIndex } from "helper";
import { v4 } from "uuid";

const initialState = {
	playlistAction: null,
	songsToBeSaved: [],
	playsListInformation: null,
	playlists_videos: [],
	playlistSelectedToPlay: [],
	savedPreviousPlaylist: [],
	playlistSelected: "",
	currentSong: null,
	shuffle: false,
	loop: false,
	suffleAllPlaylists: false,
	pause_play: null,
	showLyrics: false,
};

export const playlist = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		onCreateNewPlaylist: (state) => {
			state.playlistAction = "create";
			state.songsToBeSaved = [];
		},
		onUpdatePlaylist: (state, { payload }) => {
			state.playlistAction = "update";
			state.playsListInformation = {
				playlistName: payload.songName,
				playlistImage: {
					name: payload.img,
					url: payload.img,
				},
			};
			state.songsToBeSaved = payload.songs || [];
		},
		onResetValues: (state) => {
			state.playlistAction = null;
		},
		onAddNewSong: (state, { payload }) => {
			const refactedPayload = {
				id: v4(),
				...payload,
			};

			state.songsToBeSaved.push(refactedPayload);
		},
		onRemoveSong: (state, { payload }) => {
			state.songsToBeSaved = state.songsToBeSaved.filter((song) => song.id !== payload);
		},
		onPopulateData: (state, { payload }) => {
			payload.sort((a, b) => {
				const nameA = a.name.toUpperCase(); // convierte a mayúsculas para ordenar sin distinguir mayúsculas y minúsculas
				const nameB = b.name.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				// names son iguales
				return 0;
			});
			state.playlists_videos = payload;
		},
		onSelectPlaylistToPlay: (state, { payload }) => {
			state.playlistSelected = payload;
			const selectedPlaylist = state.playlists_videos
				.find((el) => el.name === payload)
				.songs.map((song, idx) => ({ ...song, index: idx }));
			state.playlistSelectedToPlay = selectedPlaylist;
			state.currentSong = {
				url: selectedPlaylist[0].videoUrl,
				name: selectedPlaylist[0].songName,
				index: selectedPlaylist[0].index,
			};
		},
		//MANAGEMENT OF VIDEO PLAYER AND PLAYING BUTTONS.
		toggleSuffle: (state) => {
			state.shuffle = !state.shuffle;
		},
		onSelectNextSong: (state, { payload }) => {
			const { idx } = payload;
			let nextindex = idx === state.playlistSelectedToPlay.length ? 0 : idx;
			if (state.shuffle) {
				const ramdomIndex = getRandomIndex(state.playlistSelectedToPlay, state.currentSong.index);
				nextindex = ramdomIndex;
			}
			const nextSong = state.playlistSelectedToPlay[nextindex];
			state.currentSong = { url: nextSong.videoUrl, name: nextSong.songName, index: nextindex };
		},
		onPreviousSong: (state, { payload }) => {
			const { idx } = payload;
			let previousIndex = idx === 0 ? state.playlistSelectedToPlay.length - 1 : idx - 1;
			if (state.shuffle) {
				const ramdomIndex = getRandomIndex(state.playlistSelectedToPlay, state.currentSong.index);
				previousIndex = ramdomIndex;
			}
			const previousSong = state.playlistSelectedToPlay[previousIndex];
			state.currentSong = { url: previousSong.videoUrl, name: previousSong.songName, index: previousIndex };
		},
		onSongSelectedFromSearch: (state, { payload }) => {
			state.currentSong = { url: payload.url, name: payload.name, index: 0 };
		},
		onSongIsSelected: (state, { payload }) => {
			state.currentSong = payload;
		},
		onPausePlay: (state, { payload }) => {
			state.pause_play = payload;
		},
		onShowLyrics: (state) => {
			state.showLyrics = !state.showLyrics;
		},
		onRepeatSong: (state) => {
			state.loop = !state.loop;
		},
		onPlaySongsInAllPlaylists: (state) => {
			if (!state.suffleAllPlaylists) {
				state.loop = false;
				state.savedPreviousPlaylist = state.playlistSelectedToPlay;
				const allSongs = [];
				for (const songs of state.playlists_videos) {
					allSongs.push(...songs.songs);
				}
				state.shuffle = true;
				state.playlistSelectedToPlay = allSongs;
				state.suffleAllPlaylists = true;
				return;
			}
			state.shuffle = false;
			state.playlistSelectedToPlay = state.savedPreviousPlaylist;
			state.suffleAllPlaylists = false;
		},
		onRestartInitialState: (state) => {
			state.playlistAction = null;
			state.songsToBeSaved = [];
			state.playsListInformation = null;
			state.playlists_videos = [];
			state.playlistSelectedToPlay = [];
			state.savedPreviousPlaylist = [];
			state.playlistSelected = "";
			state.currentSong = null;
			state.shuffle = false;
			state.loop = false;
			state.suffleAllPlaylists = false;
			state.pause_play = null;
			state.showLyrics = false;
		},
	},
});
export const {
	onCreateNewPlaylist,
	onUpdatePlaylist,
	onResetValues,
	onAddNewSong,
	onRemoveSong,
	onPopulateData,
	onSelectPlaylistToPlay,
	onSongSelectedFromSearch,
	onPreviousSong,
	onSelectNextSong,
	toggleSuffle,
	onSongIsSelected,
	onPausePlay,
	onShowLyrics,
	onRepeatSong,
	onPlaySongsInAllPlaylists,
	onRestartInitialState,
} = playlist.actions;

export default playlist.reducer;
