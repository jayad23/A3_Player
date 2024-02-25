//import { v4 } from "uuid";
import { addNewValue, getCollection } from "db/firebaseMethods";
import { getDocs } from "firebase/firestore";
import { onPopulateData } from "rdx/playlist";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

export const useManagerSubCollections = (sub_collection) => {
	const { userId } = useSelector((state) => state.authentication);
	const { playlists_videos, playlistAction } = useSelector((state) => state.playlist);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const onGetPlaylistsVideosData = async () => {
		const playlist_col = getCollection(userId);
		const collection = await getDocs(playlist_col);
		const documents = collection.docs.map((doc) => doc.data());
		let playlists_names = {};
		for (const i of documents) {
			if (i.playlists_videos) {
				playlists_names = i.playlists_videos;
			}
		}
		return playlists_names;
	};

	const onGetSubCollection = async () => {
		const playlists = await onGetPlaylistsVideosData();
		const names = Object.keys(playlists);
		const dt = names.map((name) => ({ name, ...playlists[name] }));
		dispatch(onPopulateData(dt));
	};

	const onUpdatePlaylistsVideos = async (playlist, incoming_data) => {
		setLoading(true);
		const playlists = await onGetPlaylistsVideosData();
		const payload = {
			...playlists,
			[playlist]: incoming_data,
		};
		addNewValue(userId, "playlists_videos", {
			playlists_videos: payload,
		})
			.then(() => {
				setLoading(false);
				onGetSubCollection(sub_collection);
				toast.success(`Playlist ${playlistAction} successfully!`);
			})
			.catch((error) => {
				console.log("Kz: 🚀 ~ onUpdatePlaylistsVideos ~ error", error);
				setLoading(false);
			});
	};

	useEffect(() => {
		onGetSubCollection(sub_collection);
	}, [sub_collection]);

	return {
		data: playlists_videos,
		loading,
		onUpdatePlaylistsVideos,
	};
};
