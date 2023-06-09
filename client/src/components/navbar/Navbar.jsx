// React
import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { Box, AppBar, Toolbar } from '@mui/material';

// Components
import GlobalSearch from './search/GlobalSearch';
import Brand from './Brand';
import RouteSwticher from './route_btn/RouteSwticher';
import ThemeSwitcher from './ThemeSwitcher';
import ProfileButton from './profile_btn/ProfileButton';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import GoBackExploreBtn from './route_btn/GoBackExploreBtn';

function Navbar({ mode, themeChange }) {
    const [elevation, setElevation] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [navbarColor, setNavbarColor] = useState('transparent');
    const [lightModeColor, setLightModeColor] = useState('white');

    const currentUser = useSelector((state) => state.auth);

    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 0) {
                setElevation(4);
                setShowSearch(true);
                setNavbarColor('default');
                setLightModeColor('default');
            } else {
                setElevation(0);
                setShowSearch(false);
                setNavbarColor('transparent');
                setLightModeColor('white');
            }
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                width: '100vw',
                zIndex: 1000,
            }}
        >
            <AppBar position='static' color={navbarColor} elevation={elevation}>
                <Toolbar>
                    <Brand {...{ lightModeColor }} />
                    {showSearch && window.location.pathname !== '/account' ? (
                        <GlobalSearch {...{ lightModeColor }} />
                    ) : (
                        <Box sx={{ flexGrow: 1 }} />
                    )}
                    {window.location.pathname !== '/account' ? (
                        <RouteSwticher {...{ lightModeColor }} />
                    ) : (
                        // Go back to explore button
                        <GoBackExploreBtn />
                    )}
                    <ThemeSwitcher {...{ mode, themeChange, lightModeColor }} />
                    {currentUser.isSignedIn ? (
                        <ProfileButton />
                    ) : (
                        <GoogleOneTapLogin />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
