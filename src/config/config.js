export const authEndpoint = 'http://accounts.spotify.com/authorize';
export const clientId = '9472f0d0b8134e66b6a8a197a4536eeb';
export const liveURL = import.meta.env.VITE_LIVE_URL;
export const devURL = 'http://localhost:5173/';
export const redirectURL = liveURL;
export const scopes = [
	'playlist-read-collaborative',
	'playlist-modify-public',
	'playlist-read-private',
	'playlist-modify-private',
	'app-remote-control',
	'streaming',
	'user-read-email',
	'user-read-private',
	'user-library-modify',
	'user-library-read',
	'user-top-read',
	'user-read-playback-position',
	'ugc-image-upload',
	'user-modify-playback-state',
	'user-read-playback-state',
	'user-read-currently-playing',
	'user-follow-modify',
	'user-follow-read',
	'user-read-recently-played'
];

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes.join(
	'%20'
)}&response_type=token&show_dialog=true`;
