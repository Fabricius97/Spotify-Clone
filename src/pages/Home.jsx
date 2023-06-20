import React from 'react';
import { Box, Button } from '@mui/material';

const Home = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 5
			}}
		>
			<img
				src="Hero.jpeg"
				alt="Christoffer Fabricius"
				style={{ maxWidth: '50%', maxHeight: '50%', borderRadius: '30% 70% 70% 40% / 30% 30% 70% 70%' }}
			/>
			<Button
				size="large"
				variant="contained"
				href="https://www.linkedin.com/in/christoffer-fabricius-06baab228"
				target="_blank"
			>
				Kontakta mig!
			</Button>
		</Box>
	);
};

export default Home;
