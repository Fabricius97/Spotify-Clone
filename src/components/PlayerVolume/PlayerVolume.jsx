import { Slider, Stack } from '@mui/material';
import React, { useState } from 'react';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';

const PlayerVolume = ({ player }) => {
	const [volume, setVolume] = useState(25);
	const [isDragging, setIsDragging] = useState(false);

	const handleVolumeChange = async (value) => {
		try {
			await player.setVolume(value / 100);
		} catch (e) {
			console.error(e);
		}
	};

	const handleChange = (e, newValue) => {
		if (!isDragging) {
			setVolume(newValue);
			handleVolumeChange(newValue);
		}
	};

	const handleDragStart = () => {
		setIsDragging(true);
	};

	const handleDragEnd = (e, newValue) => {
		setIsDragging(false);
		setVolume(newValue);
		handleVolumeChange(newValue);
	};

	return (
		<Stack direction="row" spacing={2} alignItems="center" sx={{ width: 150, color: 'text.secondary' }}>
			{volume === 0 ? <VolumeOff /> : volume < 50 ? <VolumeDown /> : <VolumeUp />}
			<Slider
				min={0}
				max={100}
				step={1}
				value={volume}
				onChange={handleChange}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			/>
		</Stack>
	);
};

export default PlayerVolume;
