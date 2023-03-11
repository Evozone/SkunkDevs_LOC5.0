import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6, dMode1, dMode2, dMode3, dMode4, dMode5, dMode6
} from '../utils/colors';

export default function Profile() {

    const token = localStorage.getItem('photoApp');
    console.log(token);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            {/* Left SideBar with Profile Picture */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '30%',
                    backgroundColor: lMode1,
                    borderRight: '1px solid #000000',
                }}
            >
                <Stack spacing={1}>
                    <img src="https://picsum.photos/300/300" alt="Profile Picture" />
                </Stack>
            </Box>
            {/* Right part with Name, type of user and photo */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '70%',
                    backgroundColor: lMode1,
                }}
            >
            </Box>
        </ Box >
    );
}
