// React
import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { Box } from '@mui/material';

// External libraries
import axios from 'axios';
import ListingGrid from './ListingGrid';
import ListingFilters from './filters/ListingFilters';

export default function PhotographerListings() {
    const currentUser = useSelector((state) => state.auth);

    const [listings, setListings] = useState([]);
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({
        location: {
            cityId: currentUser.location.cityId,
            city: currentUser.location.city,
            country: currentUser.location.country,
            loc: {
                type: currentUser.location.loc.type,
                coordinates: currentUser.location.loc.coordinates,
            },
        },
        budgetStart: 0,
        budgetEnd: 10000,
        tags: [],
        fromDateTime: '',
        toDateTime: '',
    });

    // Fetches the listings on page load
    useEffect(() => {
        fetchListings();
    }, []);

    // Builds the query string from the filters object
    useEffect(() => {
        const queryArray = [];
        for (const key in filters) {
            if (filters[key]) {
                queryArray.push(`${key}=${filters[key]}`);
            }
        }
        setQuery(`?${queryArray.join('&')}`);
    }, [filters]);

    // Fetches the listings from the server
    const fetchListings = async () => {
        console.log(query);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/listings${query}`
            );
            setListings(response.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <ListingFilters {...{ filters, setFilters, fetchListings }} />
            <ListingGrid {...{ listings }} />
        </Box>
    );
}
