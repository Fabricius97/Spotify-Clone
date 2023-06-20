import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';

const SideNav = ({ spotifyApi, token }) => {
	const [albumList, setAlbumList] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;

			const data = await spotifyApi.getUserPlaylists();
			console.log(data.body);

			setLoading(false);
			setAlbumList(data.body.items);
		}
		getPlaylists();
	}, [spotifyApi, token]);

	return (
		<Box
			sx={{
				bgcolor: 'background.default',
				width: 230,
				height: '100%',
				display: { xs: 'none', md: 'flex' },
				flexDirection: 'column'
			}}
		>
			<Box p={3}>
				<img src="/Spotify_Logo.png" width={'75%'} alt="Spotify" />
			</Box>
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>PoP{/* Playlists here */}</Box>
		</Box>
	);
};

export default SideNav;
