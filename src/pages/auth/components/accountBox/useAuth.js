import { useState } from "react";
import toast from "react-hot-toast";
import { authorize } from "rdx/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { onSignin } from "db/firebaseMethods";
import { useCheckAuthority } from "hooks/useCheckAuthority";
export const useAuth = () => {
	const [loginValues, setLoginValues] = useState({ email: "", password: "" });
	const [loaders, setLoaders] = useState({ login: false });
	const { onCheckAuthority } = useCheckAuthority();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			setLoaders({ login: true });
			const response = await onSignin(loginValues);
			const user = response.user;
			if (user) {
				console.log("user", user);
				const { displayName, photoURL, accessToken, email } = user;
				const userId = email.split("@")[0];
				const isAuthorized = await onCheckAuthority(userId);
				if (isAuthorized) {
					dispatch(
						authorize({
							username: displayName,
							avatar: photoURL,
							token: accessToken,
							userId,
						}),
					);
					navigate("/dashboard");
				} else {
					toast.error("You are not authorized to access this page");
					setLoaders({ login: false });
				}
			}
		} catch (error) {
			setLoaders({ login: false });
			return toast.error("Verify your credentials and try again.");
		}
	};

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setLoginValues({ ...loginValues, [key]: value });
	};

	return { loginValues, handleChange, handleLogin, loaders };
};
