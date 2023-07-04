// React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// External Packages
import axios from 'axios';

// Material UI
import {
    Box,
    Divider,
    List,
    Typography,
    TextField,
    Tooltip,
    IconButton,
    InputAdornment,
} from '@mui/material';

// MUI Icons
import { Search as SearchIcon } from '@mui/icons-material';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../../../../../features/notify/notifySlice';

// Custom Components
import SearchedUser from './SearchedUser';

function SearchUser({ handleChatClick }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Current User
    const currentUser = useSelector((state) => state.auth);

    // States
    const [searchStatus, setSearchStatus] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [timer, setTimer] = useState(null);

    const handleSearch = (event) => {
        if (event.target.value.length > 0) {
            clearTimeout(timer);
            setSearchStatus('Searching...');
            const newTimer = setTimeout(async () => {
                try {
                    const { data } = await axios.get(
                        `${import.meta.env.VITE_SERVER_URL}/api/users?search=${
                            event.target.value
                        }`
                    );
                    setSearchResults(data.result);
                } catch (err) {
                    dispatch(
                        notify(
                            true,
                            'error',
                            'It seems something is wrong, please log out and log in again. in a minute :('
                        )
                    );
                    console.log(err);
                }
                setSearchStatus(null);
            }, 1100);
            setTimer(newTimer);
        } else {
            setSearchResults(null);
        }
    };

    const createChat = async (user) => {
        const chatId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        const lastMessageTime = Date.now();
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chats`, {
                chatId,
                userOneInfo: user,
                userTwoInfo: currentUser,
                lastMessageTime,
            });
            handleChatClick({ ...user, new: true });
        } catch (err) {
            dispatch(
                notify(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. in a minute :('
                )
            );
            console.log(err);
        }
    };

    const handleShowProfileInfo = (user) => {
        // Open new page to show user profile
        window.open(`/profile/${user.username}`, '_blank');
    };

    return (
        <Box sx={{ position: 'relative', height: 'inherit' }}>
            <List sx={{ p: 0 }}>
                <TextField
                    autoFocus
                    label='Search for users'
                    onChange={handleSearch}
                    sx={{
                        m: 1,
                        width: 'calc(100% - 16px)',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <Tooltip title='Search for users by typing their name or username'>
                                <InputAdornment position='end'>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            </Tooltip>
                        ),
                    }}
                    size='small'
                />
                <Divider />

                {searchResults &&
                    searchResults.map((user) => (
                        <SearchedUser
                            key={user.uid}
                            user={user}
                            handleShowProfileInfo={handleShowProfileInfo}
                            createChat={createChat}
                        />
                    ))}
            </List>
            {searchStatus && (
                <img
                    style={{
                        alignSelf: 'center',
                        width: '100px',
                        position: 'absolute',
                        top: '36%',
                        right: '25%',
                    }}
                    src='/assets/vectors/searching.svg'
                    alt='searching'
                />
            )}
            {searchResults && searchResults.length === 0 && (
                <Typography sx={{ fontSize: '1.1rem', m: 2 }}>
                    No results found
                </Typography>
            )}
        </Box>
    );
}

export default SearchUser;
