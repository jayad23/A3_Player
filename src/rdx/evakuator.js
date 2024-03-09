export const evaluateDeviceFrom = () => {
	if (/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 513) {
		console.log(window.innerWidth);
		return {
			height: "38.5vh",
			position: "relative",
		};
	} else {
		// Desktop or laptop
		console.log(window.innerWidth);
		return {
			height: "46.5vh", //38.5vh
			position: "relative",
		};
	}
};
