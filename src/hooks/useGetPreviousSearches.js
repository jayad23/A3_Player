//import { v4 } from "uuid";
import { getCollection } from "db/firebaseMethods";
import { getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

export const useGetPreviousSearches = () => {
	const { userId } = useSelector((state) => state.authentication);

	const onGetPreviousSearches = async () => {
		const playlist_col = getCollection(userId);
		const collection = await getDocs(playlist_col);
		const documents = collection.docs.map((doc) => doc.data());
		let previousSearches = {};
		for (const i of documents) {
			if (i.previousSearches) {
				previousSearches = i.previousSearches;
			}
		}

		return previousSearches;
	};

	return {
		onGetPreviousSearches,
	};
};
