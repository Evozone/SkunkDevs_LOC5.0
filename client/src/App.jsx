import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './components/helpers/ProtectedRoute';
import { HMSRoomProvider } from '@100mslive/hms-video-react';

import { signIn } from './features/auth/authSlice';
import Navbar from './components/navbar/Navbar';
import Explore from './components/routes/explore/Explore';
import Blogs from './components/routes/blogs/Blogs';
import Connect from './components/routes/connect/Connect';
import Listings from './components/routes/listings/Listings';
import Stage from './components/routes/stage/Stage';
import StageRoom from './components/routes/stage/StageRoom';
import ViewBlog from './components/routes/blogs/ViewBlog';
import CreateBlog from './components/routes/blogs/CreateBlog';
import EditBlog from './components/routes/blogs/EditBlog';
import Profile from './components/routes/profile/Profile';
import PersonalCall from './components/routes/connect/PersonalCall';
import Loading from './components/helpers/Loading';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localTheme = window.localStorage.getItem('photoAppTheme');

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
        window.localStorage.setItem('photoAppTheme', updatedTheme);
        setMode(updatedTheme);
    };

    const isSignedIn = true;
    // const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    useEffect(() => {
        const auth = window.localStorage.getItem('photoApp');
        if (auth) {
            const { dnd } = JSON.parse(auth);
            const {
                uid,
                email,
                name,
                avatar,
                username,
                socialLinks,
                _id,
                location,
                bio,
            } = jwtDecode(dnd);
            dispatch(
                signIn(
                    uid,
                    bio,
                    socialLinks,
                    location,
                    email,
                    name,
                    avatar,
                    username,
                    _id,
                    dnd
                )
            );
            const value = window.localStorage.getItem('photoAppLastPage');
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
            <Loading />
            {/* if value is profile then don't show Navbar */}

            <Routes>
                {/*  */}

                <Route
                    path='/'
                    element={<Explore themeChange={themeChange} mode={mode} />}
                />

                {/* Stage */}

                <Route
                    path='/stage'
                    element={
                        <HMSRoomProvider>
                            <Stage themeChange={themeChange} mode={mode} />
                        </HMSRoomProvider>
                    }
                />

                {/* Stage Room */}
                <Route
                    path='/room/:id'
                    element={
                        <HMSRoomProvider>
                            <StageRoom themeChange={themeChange} mode={mode} />
                        </HMSRoomProvider>
                    }
                />

                {/* Blogs */}

                <Route
                    path='/blogs'
                    element={<Blogs themeChange={themeChange} mode={mode} />}
                />
                <Route
                    path='/blog/:id'
                    element={
                        <>
                            <Navbar themeChange={themeChange} mode={mode} />
                            <ViewBlog themeChange={themeChange} mode={mode} />
                        </>
                    }
                />
                <Route
                    path='/createBlog'
                    element={
                        <CreateBlog themeChange={themeChange} mode={mode} />
                    }
                />
                <Route
                    path='/editBlog/:id'
                    element={<EditBlog themeChange={themeChange} mode={mode} />}
                />

                {/* Connect */}

                <Route
                    path='/connect'
                    element={<Connect themeChange={themeChange} mode={mode} />}
                />
                <Route
                    path='/connect/pc/:id'
                    element={<PersonalCall mode={mode} />}
                />
                {/* Listings */}

                <Route
                    path='/listing'
                    element={<Listings themeChange={themeChange} mode={mode} />}
                />

                {/* Profile */}

                <Route
                    path='/profile'
                    element={<Profile themeChange={themeChange} mode={mode} />}
                />
            </Routes>

            {window.location.href != 'http://localhost:5173/profile' ? (
                <Navbar
                    {...{
                        themeChange,
                        mode,
                    }}
                />
            ) : null}
        </ThemeProvider>
    );
}

export default App;
