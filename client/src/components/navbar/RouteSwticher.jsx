// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import { FormControl, InputAdornment, MenuItem, Select } from '@mui/material';

// Material UI Icons
import ExploreIcon from '@mui/icons-material/Explore';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import ListIcon from '@mui/icons-material/List';

export default function RouteSwticher() {
    const navigate = useNavigate();

    const routes = [
        { name: 'Explore', path: '', icon: <ExploreIcon /> },
        { name: 'Spaces', path: 'spaces', icon: <SpaceDashboardIcon /> },
        { name: 'Blogs', path: 'blogs', icon: <PostAddIcon /> },
        { name: 'Connect', path: 'connect', icon: <PeopleIcon /> },
        { name: 'Listings', path: 'listings', icon: <ListIcon /> },
    ];

    const currentRoutePath =
        window.localStorage.getItem('photoAppLastPage') || '';
    const currentRouteName = routes.find(
        (route) => route.path === currentRoutePath
    ).name;

    const handleChange = (event) => {
        const path = routes.find((route) => route.name === event.target.value);

        window.localStorage.setItem('photoAppLastPage', path.path);

        navigate(path.path);
    };

    return (
        <FormControl
            sx={{
                m: 0,
                '& .MuiOutlinedInput-root': {
                    borderRadius: '2rem',
                    height: '35px',
                    border: '1px solid grey',
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                },
            }}
        >
            <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={currentRouteName}
                onChange={handleChange}
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
