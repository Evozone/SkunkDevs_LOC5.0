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
import GavelIcon from '@mui/icons-material/Gavel';
import Chip from '@mui/material/Chip';

export default function ExploreSearch({ mode }) {
    const [searchStatus, setSearchStatus] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [timer, setTimer] = useState(null);
    const [profileInfoOpen, setProfileInfoOpen] = useState(false);
    const [otherUser, setOtherUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filters, setFilters] = useState('Free');

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
                        `${process.env.REACT_APP_SERVER_URL}/api/explore/searchPosts/${filters}?search=${event.target.value}`
                    );
                    setSearchResults(data.result);
                    console.log(data.result);
                } catch (err) {
                    alert('Something went wrong!');
                    console.log(err);
                }
                setSearchStatus(null);
            }, 1100);
            setTimer(newTimer);
        } else {
            setSearchResults(null);
        }
    };

    return (
        <Box sx={{ position: 'relative', height: 'inherit' }}>
            <TextField
                autoFocus
                label='Search Images'
                onChange={handleSearch}
                sx={{
                    position: 'absolute',
                    mt: '5rem',
                    mb: '1rem',
                    left: '25%',
                    width: '50%',
                    '& .MuiOutlinedInput-root': {
                        paddingRight: '6px',
                        borderRadius: '20px',

                        '&.Mui-focused fieldset': {
                            borderColor: 'black',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black',
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
                        setFilters('Premium');
                    }}
                >
                    <ListItemText sx={{ ml: 1 }} primary='Premium' />
                </MenuItem>
            </Menu>

            {searchStatus && (
                <img
                    style={{
                        alignSelf: 'center',
                        width: '200px',
                        position: 'absolute',
                        top: '56%',
                        right: '25%',
                    }}
                    src='/assets/vectors/searching.svg'
                    alt=''
                />
            )}
            {searchResults && searchResults.length === 0 && (
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
