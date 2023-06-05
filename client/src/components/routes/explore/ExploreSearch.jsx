import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddCommentIcon from '@mui/icons-material/AddComment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Groups2Icon from '@mui/icons-material/Groups2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreIcon from '@mui/icons-material/Explore';
import CommentIcon from '@mui/icons-material/Comment';
import Chip from '@mui/material/Chip';

export default function ExploreSearch({
    mode,
    setPosts,
    posts,
    filters,
    setFilters,
}) {
    const [searchStatus, setSearchStatus] = useState(null);
    const [timer, setTimer] = useState(null);
    const [profileInfoOpen, setProfileInfoOpen] = useState(false);
    const [otherUser, setOtherUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = (event) => {
        if (event.target.value.length > 0) {
            clearTimeout(timer);
            setSearchStatus('Searching...');
            const newTimer = setTimeout(async () => {
                try {
                    const { data } = await axios.get(
                        `${
                            import.meta.env.VITE_SERVER_URL
                        }/api/explore/searchPosts/${filters}?search=${
                            event.target.value
                        }`
                    );
                    setPosts(data.result);
                } catch (err) {
                    alert('Something went wrong!');
                    console.log(err);
                }
                setSearchStatus(null);
            }, 1100);
            setTimer(newTimer);
        } else {
            setPosts(null);
        }
    };

    return (
        <Box sx={{ position: 'relative', height: 'inherit' }}>
            <TextField
                autoFocus
                label='Search Images'
                onChange={handleSearch}
                sx={{
                    color: 'white',
                    backgroundColor: 'white',
                    position: 'absolute',
                    mt: '20rem',
                    mb: '1rem',
                    left: '25%',
                    width: '50%',
                    '& .MuiOutlinedInput-root': {
                        paddingRight: '6px',
                        borderRadius: '20px',

                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <>
                            <Chip
                                label={`${filters}`}
                                variant='outlined'
                                size='small'
                            />
                            <Tooltip title='Add filters' placement='right'>
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleFilterClick}>
                                        <FilterAltIcon />
                                    </IconButton>
                                </InputAdornment>
                            </Tooltip>
                        </>
                    ),
                }}
                size='small'
            />

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        setFilters('Free');
                    }}
                >
                    <ListItemText sx={{ ml: 1 }} primary='Free' />
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        setFilters('Standard');
                    }}
                >
                    <ListItemText sx={{ ml: 1 }} primary='Standard' />
                </MenuItem>
                {/* {renderInstallOption()} */}
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        setFilters('Professional');
                    }}
                >
                    <ListItemText sx={{ ml: 1 }} primary='Professional' />
                </MenuItem>
            </Menu>

            {searchStatus && (
                <img
                    style={{
                        alignSelf: 'center',
                        width: '200px',
                        position: 'absolute',
                        top: '96%',
                        marginTop: '100px',
                        right: '40%',
                    }}
                    src='/assets/vectors/searching.svg'
                    alt=''
                />
            )}
            {posts && posts.length === 0 && (
                <Typography
                    sx={{
                        fontSize: '1.1rem',
                        ml: 2,
                        mt: 2,
                        mb: 1,
                    }}
                >
                    No results found
                </Typography>
            )}
        </Box>
    );
}
