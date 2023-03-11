import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Groups2Icon from '@mui/icons-material/Groups2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreIcon from '@mui/icons-material/Explore';
import CommentIcon from '@mui/icons-material/Comment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import IconButton from '@mui/material/IconButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import GoogleOneTapLogin from './GoogleOneTapLogin';

import { CustomSwitcherGroup, CustomSwitcherButton } from './CustomSwitcher';

import { lMode1, lMode2, lMode3, lMode4, lMode5, lMode6, light, deepDark, richBlack, dMode1, bluegrey, dMode2, dMode3, dMode4, dMode5, dMode6 } from '../utils/colors';

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
            {/* Mode1 as navbar, Mode2 as Textcolor, Mode3 as selctcolor, Mode4 as hovercolor, Mod5 as */}
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',

                    alignItems: 'center',
                    backgroundColor: mode === 'light' ? lMode1 : dMode1,
                    color: 'white',

                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.30)',

                    borderRadius: '50px',
                    pr: 1,
                    zIndex: '1000',
                    top: '5px',
                }}
            >

                <CustomSwitcherGroup exclusive>
                    {/* Explore */}
                    <CustomSwitcherButton
                        onClick={() => handleNavigation('')}
                        value=''
                        selected={selected === ''}
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
                        <PersonSearchIcon /> Listings
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

                {currentUser?.isSignedIn ? (
                    <IconButton
                        sx={{ p: '6px' }}
                        onClick={handleMenuClick}
                    >
                        <Avatar
                            alt={currentUser.name
                                .charAt(0)
                                .toUpperCase()}
                            src={currentUser.photoURL}
                            sx={{
                                bgcolor:
                                    mode === 'light' ? lMode5 : dMode5,
                                color:
                                    mode === 'light' ? lMode1 : dMode1,
                                height: 35,
                                width: 35,
                                border: '2px solid',
                            }}
                        >
                            {currentUser.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                ) : (
                    <GoogleOneTapLogin />
                )}
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor:
                                mode === 'light' ? lMode1 : dMode1,
                            boxShadow: 'none',
                            border: `1px solid ${lMode6}`,
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            themeChange();
                        }}
                    >
                        {mode === 'light' ? (
                            <DarkModeIcon
                                sx={{
                                    color:
                                        mode === 'light' ? lMode3 : dMode3,
                                    fontSize: '1.7rem',
                                    ml: -0.5,
                                }}
                            />
                        ) : (
                            <LightModeIcon
                                sx={{
                                    color:
                                        mode === 'light' ? lMode3 : dMode3,
                                    fontSize: '1.7rem',
                                    ml: -0.5,
                                }}
                            />
                        )}
                        <ListItemText sx={{ ml: 1 }} primary='Theme' />
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleMenuClose();
                            // setModalVisible(true);
                        }}
                    >
                        <AccountBoxIcon
                            sx={{
                                color:
                                    mode === 'light' ? lMode3 : dMode3,
                                fontSize: '1.7rem',
                                ml: -0.5,
                            }}
                        />
                        <ListItemText
                            sx={{ ml: 1 }}
                            primary='Profile'
                        />
                    </MenuItem>
                    {/* {renderInstallOption()} */}
                    <MenuItem
                        onClick={() => {
                            handleMenuClose();
                            handleSignOut();
                        }}
                    >
                        <LogoutIcon
                            sx={{
                                color:
                                    mode === 'light' ? lMode3 : dMode3,
                            }}
                        />
                        <ListItemText sx={{ ml: 1 }} primary='Logout' />
                    </MenuItem>
                </Menu>
            </Box >
        </Box >

    );
}

export default MainAppbar;
