// React
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from './features/auth/authSlice';

// External Packages
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { HMSRoomProvider } from '@100mslive/hms-video-react';

// Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Other Components
import Navbar from './components/navbar/Navbar';
import Loading from './components/helpers/Loading';

// Route Components
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

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localTheme = window.localStorage.getItem('photoAppTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const themeChange = () => {
        const updatedTheme = mode === 'light' ? 'dark' : 'light';
        window.localStorage.setItem('photoAppTheme', updatedTheme);
        setMode(updatedTheme);
    };

    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    useEffect(() => {
        async function checkProfile() {
            const token = localStorage.getItem('photoApp');
            if (token) {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('photoApp');
                    navigate('/');
                } else {
                    const uid = decodedToken.sub;
                    try {
                        const profile = await axios.get(
                            `${import.meta.env.VITE_SERVER_URL}/api/user/${uid}`
                        );
                        if (profile.data.result !== null) {
                            dispatch(signIn({ ...profile.data.result, token }));
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }

        if (!isSignedIn) {
            checkProfile();
        }
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Loading />
            {/* if value is profile then don't show Navbar */}

            <Routes>
                <Route path='/' element={<Explore />} />

                {/* Spaces */}
                <Route
                    path='/spaces'
                    element={
                        <HMSRoomProvider>
                            <Stage />
                        </HMSRoomProvider>
                    }
                />

                {/* Stage Room */}
                <Route
                    path='/room/:id'
                    element={
                        <HMSRoomProvider>
                            <StageRoom />
                        </HMSRoomProvider>
                    }
                />

                {/* Blogs */}
                <Route path='/blogs' element={<Blogs />} />
                <Route
                    path='/blog/:id'
                    element={
                        <>
                            <Navbar />
                            <ViewBlog />
                        </>
                    }
                />
                <Route path='/createBlog' element={<CreateBlog />} />
                <Route path='/editBlog/:id' element={<EditBlog />} />

                {/* Connect */}
                <Route path='/connect' element={<Connect />} />
                <Route path='/connect/pc/:id' element={<PersonalCall />} />

                {/* Listings */}
                <Route path='/listings' element={<Listings />} />

                {/* Profile */}
                <Route path='/profile' element={<Profile />} />
            </Routes>

            {window.location.href != 'http://localhost:5173/profile' ? (
                <Navbar {...{ themeChange, mode }} />
            ) : null}
        </ThemeProvider>
    );
}

export default App;
