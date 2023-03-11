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
import Stage from './components/Stage';
import Blogs from './components/Blogs';
import Connect from './components/Connect';
import Listings from './components/Listings';

import { customGlobalScrollBars, smoothScrolling } from './components/CustomGlobalCSS';


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
        sub: uid,
        email,
        name,
        picture: photoURL,
        iat: signInTime,
      } = jwtDecode(dnd);
      dispatch(signInAction(uid, email, name, photoURL, dnd, signInTime));
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
      {customGlobalScrollBars(mode)}
      {smoothScrolling()}

      <MainAppbar
        {...{
          themeChange,
          mode,
        }}
      />

      <Routes>

        <Route path='/explore' element={<Explore />} />

        <Route
          path='/stage'
          element={
            <Stage themeChange={themeChange} mode={mode} />
          }
        />

        <Route
          path='/blogs'
          element={
            <Blogs themeChange={themeChange} mode={mode} />
          }
        />

        <Route
          path='/connect'
          element={
            <Connect themeChange={themeChange} mode={mode} />
          }
        />

        {/* Listings */}

        <Route
          path='/listings'
          element={
            <Listings themeChange={themeChange} mode={mode} />
          }
        />

      </Routes>

    </ThemeProvider>
  );
}

export default App;