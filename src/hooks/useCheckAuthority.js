//import { v4 } from "uuid";
import { getCollection } from "db/firebaseMethods";
import { getDocs } from "firebase/firestore";

export const useCheckAuthority = () => {
	const onCheckAuthority = async (userId) => {
		const playlist_col = getCollection(userId);
		const collection = await getDocs(playlist_col);
		const documents = collection.docs.map((doc) => doc.data());
		let authorized = false;
		for (const i of documents) {
			if (i.authorized) {
				authorized = i.authorized;
			}
		}
		return authorized;
	};

	return {
		onCheckAuthority,
	};
};
