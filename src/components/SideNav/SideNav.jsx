import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import NavItem from '../NavItem/NavItem';
import HomeIcon from '@mui/icons-material/Home';
import NavPlaylist from '../NavPlaylist/NavPlaylist';

const SideNav = ({ spotifyApi, token }) => {
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;

			const data = await spotifyApi.getUserPlaylists();
			setPlaylists(data.body.items);
			setLoading(true);
			console.log(data.body.items);
		}
		getPlaylists();
	}, [spotifyApi, token]);

	const renderPlaylists = () => {
		if (loading) {
			return Array.from({ length: 23 }, (_, i) => <NavPlaylist key={i} loading={loading} />);
		}

		return playlists.map((playlist, i) => (
			<NavPlaylist name={playlist.name} id={playlist.id} loading={loading} key={i} />
		));
	};

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
			<NavItem name="Home" Icon={HomeIcon} target="/" />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{renderPlaylists()}</Box>
		</Box>
	);
};

export default SideNav;
