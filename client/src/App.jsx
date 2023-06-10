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
import Notify from './components/helpers/Notify';

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
import Account from './components/routes/account/Account';
import PersonalCall from './components/routes/connect/PersonalCall';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localTheme = window.localStorage.getItem('photoAppTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');

    const theme = createTheme({
        palette: {
            mode: mode,
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
                            `${
                                import.meta.env.VITE_SERVER_URL
                            }/api/users/${uid}`
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
        <ThemeProvider {...{ theme }}>
            <CssBaseline />
            <Loading />
            <Notify />
            <Navbar {...{ themeChange, mode }} />
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

                {/* Account Data */}
                <Route path='/account' element={<Account />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
