import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Groups2Icon from '@mui/icons-material/Groups2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListItemText from '@mui/material/ListItemText';
import QuizIcon from '@mui/icons-material/Quiz';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ExploreIcon from '@mui/icons-material/Explore';
import CommentIcon from '@mui/icons-material/Comment';
import GavelIcon from '@mui/icons-material/Gavel';

import GoogleOneTapLogin from './GoogleOneTapLogin';

import { CustomSwitcherGroup, CustomSwitcherButton } from './CustomSwitcher';
import { richBlack, light, medium, deepDark, bluegrey } from '../utils/colors';
import { signOutAction } from '../actions/actions';
import { Avatar, Icon } from '@mui/material';

function MainAppbar({ mode, themeChange }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(
        window.localStorage.getItem('photoAppLastPage') || 'stage'
    );

    const handleSignOut = () => {
        const choice = window.confirm('Please click on OK to Log Out.');
        if (choice) {
            dispatch(signOutAction());
            window.localStorage.removeItem('photoAppLastPage');
            navigate('/');
        }
    };

    const handleNavigation = (value) => {
        setSelected(value);
        window.localStorage.setItem('photoAppLastPage', value);
        navigate(`/${value}`);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',

                    alignItems: 'center',
                    backgroundColor: mode === 'light' ? deepDark : light,
                    color: 'white',

                    borderRadius: '50px',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',

                    zIndex: '1000',
                    px: 2,
                    top: '5px',
                }}
            >

                <IconButton
                    onClick={themeChange}
                    sx={{ color: 'white', height: 30, width: 30 }}
                    aria-label='change theme'
                >
                    {mode === 'light' ? (
                        <DarkModeIcon sx={{ height: 25, width: 25 }} />
                    ) : (
                        <LightModeIcon sx={{ height: 25, width: 25, color: richBlack, }} />
                    )}
                </IconButton>

                {true ? (
                    <>
                        <CustomSwitcherGroup exclusive>
                            {/* Explore */}
                            <CustomSwitcherButton
                                onClick={() => handleNavigation('explore')}
                                value='explore'
                                selected={selected === 'explore'}
                            >
                                <ExploreIcon /> Explore
                            </CustomSwitcherButton>

                            {/* Stage */}
                            <CustomSwitcherButton
                                onClick={() => handleNavigation('stage')}
                                value='stage'
                                selected={selected === 'stage'}
                            >
                                <Groups2Icon /> Stage
                            </CustomSwitcherButton>
                            <CustomSwitcherButton
                                onClick={() => handleNavigation('blogs')}
                                value='blogs'
                                selected={selected === 'blogs'}
                            >
                                <LibraryBooksIcon /> Blogs
                            </CustomSwitcherButton>
                            <CustomSwitcherButton
                                onClick={() => handleNavigation('connect')}
                                value='connect'
                                selected={selected === 'connect'}
                            >
                                <CommentIcon /> Connect
                            </CustomSwitcherButton>
                            <CustomSwitcherButton
                                onClick={() => handleNavigation('listing')}
                                value='listing'
                                selected={selected === 'listing'}
                            >
                                <GavelIcon /> Listings
                            </CustomSwitcherButton>

                        </CustomSwitcherGroup>

                        {/* <IconButton onClick={handleMenuClick}>
                        <Avatar
                            // alt={currentUser.name.charAt(0).toUpperCase()}
                            // src={currentUser.photoURL}
                            sx={{
                                bgcolor: mode === 'light' ? deepDark : light,
                                color: mode === 'light' ? light : deepDark,
                                height: 45,
                                width: 45,
                                border: '2px solid',
                            }}
                        >
                            {currentUser.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton> */}

                        <GoogleOneTapLogin />

                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor:
                                        mode === 'light' ? light : bluegrey,
                                },
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleSignOut();
                                }}
                            >
                                <LogoutIcon
                                    sx={{
                                        color: mode === 'light' ? deepDark : light,
                                    }}
                                />
                                <ListItemText sx={{ ml: 1 }} primary='Logout' />
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <CustomSwitcherGroup>
                        <CustomSwitcherButton
                            onClick={() => navigate('/')}
                            value='/'
                        >
                            <GroupAddIcon /> Join Now
                        </CustomSwitcherButton>
                    </CustomSwitcherGroup>
                )}
            </Box>
        </Box>
    );
}

export default MainAppbar;
