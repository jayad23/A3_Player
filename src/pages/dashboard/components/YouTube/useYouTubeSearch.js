import { useState, useEffect } from "react";
import axios from "axios";
import { v4 } from "uuid";
import toast from "react-hot-toast";
import { addNewValue } from "db/firebaseMethods";
import { useSelector, useDispatch } from "react-redux";
//import useMediaQuery from "@mui/material/useMediaQuery";
import { onToggleSearchesModal } from "rdx/prevSearches";
import { useGetPreviousSearches } from "hooks/useGetPreviousSearches";

const rootUrl = "https://www.youtube.com/watch?v=";

export const useYouTubeSearch = (savePreviousSearch = false) => {
	const apiKey = `${process.env.REACT_APP_YOUTUBE_API_KEY}`;
	const { onGetPreviousSearches } = useGetPreviousSearches();
	const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [loading, setLoading] = useState(false);
	const { userId } = useSelector((state) => state.authentication);
	const { values, openOptionModal } = useSelector((state) => state.prevSearches);
	//const matches = useMediaQuery("(max-width:600px)");

	useEffect(() => {
		if (openOptionModal) {
			setSearchValue("");
			setSelectedVideoUrl("");
		}
	}, [openOptionModal]);

	const dispatch = useDispatch();

	const modelData = async (data) => {
		const results = [];
		if (data.length > 0) {
			for (const i of data) {
				if (i.id.videoId) {
					results.push({
						...i,
						uid: v4(),
						videoUrl: `${rootUrl}${i.id.videoId}`,
					});
				}
			}
		}
		setSearchResults(results);
		setLoading(false);

		if (savePreviousSearch) {
			const previous = await onGetPreviousSearches();
			dispatch(onToggleSearchesModal(false));
			addNewValue(userId, "previousSearches", {
				previousSearches: {
					[searchValue]: results,
					...previous,
				},
			});
		}
	};

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const onSearch = async (e) => {
		e.preventDefault();
		if (searchValue.length === 0) {
			return toast.error("Please enter a search term 🧐");
		}
		setLoading(true);
		try {
			//https://www.googleapis.com/youtube/v3/search
			const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
				params: {
					part: "snippet",
					maxResults: 30, // Adjust as needed
					q: searchValue,
					key: apiKey,
				},
			});
			modelData(response.data.items);
		} catch (error) {
			setLoading(false);
			return toast.error("No value found 😥");
		}
	};

	const onSelectVideo = (url) => {
		setSelectedVideoUrl(url);
	};

	const onGoBack = () => {
		setSelectedVideoUrl("");
	};

	const handleSelectSavedResults = (val) => {
		dispatch(onToggleSearchesModal(false));
		setSearchResults(values[val]);
	};

	return {
		loading,
		onSearch,
		onGoBack,
		searchValue,
		handleChange,
		searchResults,
		onSelectVideo,
		selectedVideoUrl,
		handleSelectSavedResults,
	};
};
