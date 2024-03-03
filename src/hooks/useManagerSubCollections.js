//import { v4 } from "uuid";
import {
	//addNewValue,
	getCollection,
	onUpdateSubCollectionById,
} from "db/firebaseMethods";
import { getDocs } from "firebase/firestore";
import { onPopulateData } from "rdx/playlist";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
//import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

export const useManagerSubCollections = (sub_collection) => {
	const { userId } = useSelector((state) => state.authentication);
	//playlistAction
	const { playlists_videos } = useSelector((state) => state.playlist);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const onGetPlaylistsVideosData = async () => {
		const playlist_col = getCollection(userId);
		const collection = await getDocs(playlist_col);
		const documents = collection.docs.map((doc) => doc.data());
		const docs = documents.filter((doc) => !doc.authorized);
		dispatch(onPopulateData(docs));
		setLoading(false);
	};

	const onUpdatePlaylistsVideos = async (playlist, incoming_data) => {
		console.log("Kz: 🏈 ~ onUpdatePlaylistsVideos ~ playlist, incoming_data:", playlist, incoming_data);
		setLoading(true);
		await onUpdateSubCollectionById(userId, playlist, incoming_data)
			.then(() => {
				onGetPlaylistsVideosData();
			})
			.finally(() => {
				toast.success("Playlist updated/created successfully");
			});
	};

	useEffect(() => {
		onGetPlaylistsVideosData();
	}, [sub_collection]);

	return {
		data: playlists_videos,
		loading,
		onUpdatePlaylistsVideos,
	};
};
