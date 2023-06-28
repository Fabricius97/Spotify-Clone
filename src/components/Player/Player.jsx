import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVolume from '../PlayerVolume/PlayerVolume';
import PlayerOverlay from '../PlayerOverlay/PlayerOverlay';

const Player = ({ spotifyApi }) => {
	const [localPlayer, setPlayer] = useState(null);
	const [is_paused, setPaused] = useState(false);
	const [current_track, setTrack] = useState(null);
	const [device, setDevice] = useState(null);
	const [duration, setDuration] = useState(null);
	const [progress, setProgress] = useState(null);
	const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const token = getAccessTokenFromStorage();
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;
		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'CF Playback',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5
			});

			player.addListener('ready', ({ device_id }) => {
				// console.log('Ready with Device ID', { device_id, player });
				setDevice(device_id);
				setPlayer(player);
			});

			player.addListener('player_state_changed', async (state) => {
				if (!state || !state.track_window?.current_track) {
					return;
				}
				const duration_ms = state.track_window.current_track.duration_ms / 1000;
				const position_ms = state.position / 1000;
				setDuration(duration_ms);
				setProgress(position_ms);
				setTrack(state.track_window.current_track);
				setPaused(state.paused);

				if (player && typeof player.getCurrentState === 'function') {
					const currentState = await player.getCurrentState();
					setActive(!!currentState);
				}
			});

			setPlayer(player);
			player.connect();
		};
	}, []);

	useEffect(() => {
		if (!localPlayer) return;
		async function connect() {
			await localPlayer.connect();
		}

		connect();
		return () => {
			localPlayer.disconnect();
		};
	}, [localPlayer]);

	useEffect(() => {
		const transferMyPlayback = async () => {
			if (device) {
				await spotifyApi.transferMyPlayback([device], true);
			}
		};
		const getDeviceFromApi = async () => {
			await spotifyApi.getMyDevices();
		};
		getDeviceFromApi();
		transferMyPlayback();
	}, [device, spotifyApi]);

	// console.log({ current_track });

	return (
		<Box>
			<Grid
				onClick={() => setPlayerOverlayIsOpen((prevState) => !prevState)}
				container
				px={3}
				sx={{
					bgcolor: 'Background.paper',
					height: 100,
					cursor: { xs: 'pointer', md: 'auto' },
					width: '100%',
					borderTop: '1px solid #292929'
				}}
			>
				<Grid
					item
					xs={12}
					md={3}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-start'
					}}
				>
					<Avatar
						src={current_track?.album.images[0].url}
						alt={'#'}
						variant="square"
						sx={{ width: 56, height: 56, marginRight: 2 }}
					/>
					<Box>
						<Typography sx={{ color: 'text.primary', fontSize: 14 }}>{current_track?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
							{current_track &&
								current_track.artists.length > 0 &&
								current_track.artists.map((artist) => artist.name).join(', ')}
						</Typography>
					</Box>
				</Grid>
				<Grid
					item
					sx={{
						display: { xs: 'none', md: 'flex' },
						flex: 1,
						justifyContent: { xs: 'flex-end', md: 'center' },
						alignItems: 'center'
					}}
				>
					{active ? (
						<PlayerControls
							progress={progress}
							is_paused={is_paused}
							duration={duration}
							player={localPlayer}
						/>
					) : (
						<Box>Please transfer Playback</Box>
					)}
				</Grid>
				<Grid
					xs={6}
					md={4}
					item
					sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end' }}
				>
					<PlayerVolume player={localPlayer} />
				</Grid>
			</Grid>
			<PlayerOverlay
				playerOverlayIsOpen={playerOverlayIsOpen}
				closeOverlay={() => setPlayerOverlayIsOpen(false)}
				progress={progress}
				is_paused={is_paused}
				duration={duration}
				player={localPlayer}
				current_track={current_track}
				active={active}
			/>
		</Box>
	);
};

export default Player;
