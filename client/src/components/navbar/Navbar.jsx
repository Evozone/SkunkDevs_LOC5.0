// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../features/auth/authSlice';

// Material UI
import { Box } from '@mui/material';

// Custom Components
import GoogleOneTapLogin from '../login_flow/GoogleOneTapLogin';

import { AppBar, Toolbar } from '@mui/material';

// Components
import GlobalSearch from './search/GlobalSearch';
import Brand from './Brand';
import RouteSwticher from './RouteSwticher';
import ThemeSwitcher from './ThemeSwitcher';
import ProfilePopover from './ProfilePopover';

function Navbar({ mode, themeChange }) {
    const [elevation, setElevation] = useState(0);
    const [showSearch, setShowSearch] = useState(false);

    const currentUser = useSelector((state) => state.auth);

    useEffect(() => {
        function checkScroll() {
            if (window.scrollY > 0) {
                setElevation(4);
                setShowSearch(true);
            } else {
                setElevation(0);
                setShowSearch(false);
            }
        }
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
            }}
        >
            <AppBar
                position='static'
                color='transparent'
                elevation={elevation}
                sx={{ backdropFilter: 'blur(30px)' }}
            >
                <Toolbar>
                    <Brand />
                    {showSearch ? (
                        <GlobalSearch />
                    ) : (
                        <Box sx={{ flexGrow: 1 }} />
                    )}
                    <RouteSwticher />
                    <ThemeSwitcher {...{ mode, themeChange }} />
                    {currentUser.isSignedIn ? (
                        <ProfilePopover />
                    ) : (
                        <GoogleOneTapLogin />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
