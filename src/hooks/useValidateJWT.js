import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { useCheckAuthority } from "./useCheckAuthority";
export const useValidJWT = () => {
	const { onCheckAuthority } = useCheckAuthority();

	const isTokenExpired = async (token) => {
		if (token) {
			const decodedToken = jwtDecode(token);
			const isTokenInvalid = moment(decodedToken.exp * 1000).isBefore(moment());
			return isTokenInvalid;
		}
		return true;
	};

	const onGetJWT = async () => {
		//gets token from cookies or sessionStorage
		const existingTokenInSession = localStorage.getItem("jwt");

		let token = "";

		if (existingTokenInSession) {
			token = existingTokenInSession;
		}

		//decodes token and checks if it is expired
		const isTokenInvalid = await isTokenExpired(token);

		//if token is invalid, retrieves a new token
		if (token && !isTokenInvalid) {
			const userId = jwtDecode(token).email.split("@")[0];
			const isAuthorized = await onCheckAuthority(userId);
			return isAuthorized;
		}

		return false;
	};

	return {
		onGetJWT,
	};
};
