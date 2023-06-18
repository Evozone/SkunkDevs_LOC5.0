// Material UI - Components (named imports)
import Box from '@mui/material/Box';

// Other Components
import ChatApp from './chat_app/ChatApp';

function Connect() {
    return (
        <Box className='route-container'>
            <Box sx={{ height: '65px' }} />
            <ChatApp />
        </Box>
    );
}

export default Connect;
