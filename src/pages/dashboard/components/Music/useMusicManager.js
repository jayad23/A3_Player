import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useYouTubeSearch } from "../YouTube/useYouTubeSearch";
import { onPausePlay, onSelectNextSong, onSongIsSelected, onSongSelectedFromSearch } from "rdx/playlist";

export const useMusicManager = () => {
	const { playlistSelectedToPlay, currentSong, loop, pause_play } = useSelector((state) => state.playlist);
	const [findSong, setFindSong] = useState("");
	const dispatch = useDispatch();

	const onNextSong = (idx) => {
		dispatch(onSelectNextSong({ idx }));
	};

	const onFindSong = (e) => {
		setFindSong(e.target.value);
	};

	const onSongSelected = (id) => {
		setFindSong("");
		const selectedSong = playlistSelectedToPlay.find((song) => song.id === id);
		dispatch(onSongIsSelected({ url: selectedSong.videoUrl, name: selectedSong.songName, index: selectedSong.index }));
	};

	const { loading, onSearch, searchValue, handleChange, searchResults } = useYouTubeSearch(false);

	const onSelectSongFromSearch = (id) => {
		const selectedSong = searchResults.find((song) => song.uid === id);
		dispatch(onSongSelectedFromSearch({ url: selectedSong.videoUrl, name: selectedSong.snippet.title }));
	};

	const mediaRef = useRef(null);

	useEffect(() => {
		if (pause_play !== null) {
			if (pause_play === "pause") {
				mediaRef.current.getInternalPlayer().pauseVideo();
			} else {
				mediaRef.current.getInternalPlayer().playVideo();
			}
			dispatch(onPausePlay(null));
		}
	}, [pause_play]);

	return {
		loop,
		findSong,
		mediaRef,
		onNextSong,
		onFindSong,
		currentSong,
		onSongSelected,
		playlistSelectedToPlay,
		loading,
		onSearch,
		searchValue,
		handleChange,
		searchResults,
		onSelectSongFromSearch,
	};
};
