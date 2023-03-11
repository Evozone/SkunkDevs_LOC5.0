import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute';

import { signInAction } from './actions/actions';
import MainAppbar from './components/MainAppbar';
import Explore from './components/Explore';
import Groups from './components/Groups';
import Blogs from './components/Blogs';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localTheme = window.localStorage.getItem('healthAppTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },

        typography: {
            fontFamily: "'Open Sans', sans-serif",
        },
    });

    const themeChange = () => {
        const updatedTheme = mode === 'light' ? 'dark' : 'light';
        window.localStorage.setItem('healthAppTheme', updatedTheme);
        setMode(updatedTheme);
    };

    const isSignedIn = true;
    // const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    useEffect(() => {
        const auth = window.localStorage.getItem('photoApp');
        if (auth) {
            const { dnd } = JSON.parse(auth);
            const { uid, email, name, photoURL, username, socialLinks } =
                jwtDecode(dnd);
            dispatch(
                signInAction(
                    uid,
                    email,
                    name,
                    photoURL,
                    username,
                    socialLinks,
                    dnd
                )
            );
            const value = window.localStorage.getItem('photoApp');
            if (value && value !== undefined) {
                navigate(`/${value}`);
            } else {
                navigate('/');
            }
        }
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <MainAppbar
                {...{
                    themeChange,
                    mode,
                }}
            />

            <Routes>
                <Route path='/' element={<Explore />} />

                <Route
                    path='/groups'
                    element={<Groups themeChange={themeChange} mode={mode} />}
                />

                <Route
                    path='/blogs'
                    element={<Blogs themeChange={themeChange} mode={mode} />}
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
