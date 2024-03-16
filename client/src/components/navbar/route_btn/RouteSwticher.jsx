// React
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { FormControl, InputAdornment, MenuItem, Select } from '@mui/material';

// Material UI Icons
import ExploreIcon from '@mui/icons-material/Explore';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import ListIcon from '@mui/icons-material/List';

import PropTypes from 'prop-types';

RouteSwticher.propTypes = {
    lightModeColor: PropTypes.string,
};

export default function RouteSwticher({ lightModeColor }) {
    const navigate = useNavigate();
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    const mode = window.localStorage.getItem('photoAppTheme') || 'light';
    const givenColor =
        mode === 'dark' || lightModeColor === 'white' ? 'white' : 'black';

    const routes = [
        { name: 'Explore', path: '', icon: <ExploreIcon /> },
        { name: 'Spaces', path: 'spaces', icon: <PodcastsIcon /> },
        { name: 'Blogs', path: 'blogs', icon: <PostAddIcon /> },
        ...(isSignedIn
            ? [
                  { name: 'Connect', path: 'connect', icon: <PeopleIcon /> },
                  { name: 'Listings', path: 'listings', icon: <ListIcon /> },
              ]
            : []),
    ];

    const currentRoutePath =
        window.localStorage.getItem('photoAppLastPage') || '';

    let currentRouteName = routes.find(
        (route) => route.path === currentRoutePath
    )
        ? routes.find((route) => route.path === currentRoutePath).name
        : 'Explore';

    const handleChange = (event) => {
        const path = routes.find((route) => route.name === event.target.value);

        // Check if the path exists
        if (path.path === undefined) {
            // Navigate to a default route or show an error message
            navigate('/');
            return;
        }

        window.localStorage.setItem('photoAppLastPage', path.path);

        navigate('/' + path.path);
    };

    return (
        <FormControl
            sx={{
                m: 0,
                '& .MuiOutlinedInput-root': {
                    borderRadius: '2rem',
                    height: '35px',
                    border: `1px solid ${givenColor}`,
                    '& fieldset': {
                        borderColor: givenColor,
                    },
                    '&:hover fieldset': {
                        borderColor: givenColor,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: givenColor,
                    },
                },
            }}
        >
            <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={currentRouteName}
                onChange={handleChange}
                sx={{
                    color: givenColor,
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: givenColor,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: givenColor,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: givenColor,
                    },
                    '.MuiSvgIcon-root ': {
                        fill: givenColor,
                    },
                }}
                startAdornment={
                    <InputAdornment position='start'>
                        {
                            routes.find(
                                (route) => route.name === currentRouteName
                            ).icon
                        }
                    </InputAdornment>
                }
            >
                {routes.map((route) => (
                    <MenuItem
                        key={route.name}
                        value={route.name}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        {route.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
