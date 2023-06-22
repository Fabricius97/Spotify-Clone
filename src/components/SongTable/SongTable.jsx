import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SongRow from '../SongRow/SongRow';

const SongTable = ({ songs, loading, spotifyApi }) => {
	const renderSongs = () => {
		if (loading) {
			return [1, 2, 3, 4, 5].map((e, i) => <SongRow loading={loading} key={i} i={i} images={null} />);
		}

		return songs.map((song, i) => {
			const artists = song.artists.map((artist) => artist.name).join(', ');

			return (
				<SongRow
					album={song.album.name}
					title={song.name}
					images={song.album.images}
					artist={artists}
					duration={song.duration_ms / 1000}
					key={i}
					i={i}
					position={song.position}
					contextUri={song.contextUri}
					spotifyApi={spotifyApi}
				/>
			);
		});
	};

	return (
		<Box
			p={{ xs: 3, md: 4 }}
			sx={{
				flex: 1,
				overflowY: 'auto',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Grid container px={2} p={1} sx={{ width: '100%', color: 'text.secondary', fontSize: 14 }}>
				<Grid sx={{ width: 35, display: 'flex', alignItems: 'center' }} item>
					#
				</Grid>
				<Grid sx={{ flex: 1, display: 'flex', alignItems: 'center' }} item>
					Title
				</Grid>
				<Grid xs={3} item sx={{ display: { xs: 'none', md: 'flex' } }}>
					Album
				</Grid>
				<Grid xs={3} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<AccessTimeIcon sx={{ width: 20, height: 20 }} />
				</Grid>
			</Grid>
			<Box pb={2}>
				<Divider sx={{ width: '100%', height: '1px' }} />
			</Box>
			{renderSongs()}
		</Box>
	);
};

export default SongTable;
