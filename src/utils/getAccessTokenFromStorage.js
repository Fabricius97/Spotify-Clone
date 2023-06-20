export const getAccessTokenFromStorage = () => {
	const token = sessionStorage.getItem('spotify_token');
	if (token !== null) {
		return token;
	} else {
		return false;
	}
};
