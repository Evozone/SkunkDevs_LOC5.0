import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';

import ExplorerListings from './ExplorerListings';
import PhotographerListings from './PhotographerListings';

import {
    lMode1,
    lMode2,
    lMode3,
    lMode4,
    lMode5,
    lMode6,
    dMode1,
    dMode2,
    dMode3,
    dMode4,
    dMode5,
    dMode6,
} from '../utils/colors';
import axios from 'axios';
import { notifyAction } from '../actions/actions';
import { useDispatch } from 'react-redux';

export default function Listings({ mode }) {
    // define state for listings
    const dispatch = useDispatch();
    const [shift, setShift] = useState(true);
    const [explorerListings, setExplorerListings] = useState([]);

    // userMode can be 'explorer' or 'photographer'
    const [userMode, setUserMode] = useState('explorer');

    // Explorer's listing object
    const [listing, setListing] = useState({
        city: '',
        budget: {
            currency: 'USD',
            amount: 0,
        },
        tags: [],
        fromDateTime: '',
        toDateTime: '',
        description: '',
    });

    // Photographer's filtering options
    const [city, setCity] = useState('');
    const [priceRange, setPriceRange] = useState([100, 500]);
    const [selectedTags, setSelectedTags] = useState([]);

    const TAGS = [
        { value: 'wedding', label: 'Wedding' },
        { value: 'nature', label: 'Nature' },
        { value: 'citylife', label: 'City Life' },
        { value: 'portraits', label: 'Portraits' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'food', label: 'Food' },
        { value: 'sports', label: 'Sports' },
        { value: 'travel', label: 'Travel' },
        { value: 'architecture', label: 'Architecture' },
        { value: 'concerts', label: 'Concerts' },
        { value: 'wildlife', label: 'Wildlife' },
    ];

    const cities = [
        { value: 'newyork', label: 'New York' },
        { value: 'losangeles', label: 'Los Angeles' },
        { value: 'chicago', label: 'Chicago' },
        { value: 'houston', label: 'Houston' },
        { value: 'philadelphia', label: 'Philadelphia' },
        { value: 'phoenix', label: 'Phoenix' },
        { value: 'sanantonio', label: 'San Antonio' },
        { value: 'sandiego', label: 'San Diego' },
        { value: 'dallas', label: 'Dallas' },
        { value: 'sanjose', label: 'San Jose' },
    ];

    const handleCityChange = (event, value) => {
        setCity(value);
    };

    const handlePriceRangeChange = (event, value) => {
        setPriceRange(value);
    };

    const handleTagChange = (event, value) => {
        setSelectedTags(value);
    };

    const handleListingChange = (event) => {
        setListing({ ...listing, [event.target.name]: event.target.value });
    };

    const handleListingSubmit = (event) => {
        event.preventDefault();
        console.log(listing);
        console.log('This object to be sent to backend');
    };

    const handleDeleteTag = (tag) => {
        setSelectedTags((selectedTags) =>
            selectedTags.filter((t) => t !== tag)
        );
    };

    const handleTagAdd = (event, value) => {
        if (value && !selectedTags.includes(value)) {
            setSelectedTags((selectedTags) => [...selectedTags, value]);
        }
    };

    const handleListingReset = () => {
        setListing({
            city: '',
            budget: '',
            tags: [],
            fromDateTime: '',
            toDateTime: '',
            description: '',
        });
    };

    const handleFilterReset = () => {
        setCity('');
        setPriceRange([100, 500]);
        setSelectedTags([]);
    };

    // define a function to handle deleting a listing
    const handleDeleteListing = (listingId) => {
        // your API call to delete the listing
        // then update the state to remove the deleted listing
    };

    const handleSubmitListing = async () => {
        console.log(listing);
        if (!listing.city || !listing.description || !listing.budget.amount) {
            alert('Please fill all the required fields.');
            return;
        }
        const auth = window.localStorage.getItem('photoApp');
        const { dnd } = JSON.parse(auth);
        const data = {
            city: listing.city,
            budgetAmount: listing.budget.amount,
            description: listing.description,
            tags: listing.tags.map((l) => l.label),
            fromDateTime: listing.fromDateTime,
            toDateTime: listing.toDateTime,
        };
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/api/listing/create`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
                data,
            });
            setShift((prev) => !prev);
            dispatch(
                notifyAction(
                    true,
                    'success',
                    'Created a new Listing successfully!'
                )
            );
        } catch (error) {
            console.log(error);
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. later :('
                )
            );
        }
    };

    useEffect(() => {
        // Effect to be run when userMode changes
        // fetch explorerListings from backend
    }, [listing, city, priceRange, selectedTags]);

    return (
        <Box
            sx={{
                overflowY: 'auto',
                minHeight: '100vh',
                background: mode === 'light' ? 'whitesmoke' : 'black',
                padding: '3rem',
                pt: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Button at corner of screen swtiching between explorer and photographer */}
            {/* @TODO: DELETE THIS BUTTON */}
            <button
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                }}
                onClick={() => {
                    if (userMode === 'explorer') {
                        setUserMode('photographer');
                    } else {
                        setUserMode('explorer');
                    }
                }}
            >
                {userMode}
            </button>

            <Typography
                variant='h1'
                component='h2'
                sx={{
                    color: mode === 'light' ? lMode3 : dMode3, // light mode 3
                    margin: '1rem',
                    marginTop: '5rem',
                    fontWeight: 'bold',
                    fontSize: '3rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Say 'Job Listings' for Photographer, else say 'Looking for a Professional Photographer?' */}

                {userMode === 'photographer'
                    ? 'Job Listings'
                    : 'Looking for a Professional Photographer?'}

                <PersonSearchIcon
                    sx={{ fontSize: '3rem', marginLeft: '1rem' }}
                />
            </Typography>

            {/* If userMode is 'photographer', say 'Find a Job Near You', else nothing */}

            <Typography
                variant='h2'
                component='h3'
                sx={{
                    color: mode === 'light' ? lMode2 : dMode2,
                    margin: '2rem',
                    fontFamily: 'Work Sans',
                    fontWeight: 'medium',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {userMode === 'photographer'
                    ? 'Find a Job Near You'
                    : 'Create a Job Listing below and keep track of who is interested.'}
            </Typography>

            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 2,
                }}
            >
                {/* Card */}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        flex: 1,
                        borderRadius: '1rem',
                        bgcolor: mode === 'light' ? lMode1 : dMode1,
                        boxShadow: 2,
                        p: 1,
                    }}
                >
                    {/* User Mode can be photographer or explorer */}
                    {userMode === 'explorer' ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                width: '100%',
                                p: 2,
                            }}
                        >
                            {/* To Add a new Listing */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    height: 'fit-content',
                                    p: 3,
                                    borderRadius: '1rem',
                                    bgcolor: mode === 'light' ? lMode2 : dMode2,
                                    boxShadow: 2,
                                }}
                            >
                                <Typography
                                    variant='h2'
                                    component='h3'
                                    sx={{
                                        color:
                                            mode === 'light' ? lMode6 : dMode6,
                                        margin: '2rem',
                                        fontFamily: 'Work Sans',
                                        fontWeight: 'medium',
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    Create a Job Listing
                                </Typography>

                                <form onSubmit={handleListingSubmit}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextField
                                            id='city'
                                            name='city'
                                            label='City'
                                            value={listing.city}
                                            required
                                            onChange={(e) =>
                                                setListing({
                                                    ...listing,
                                                    city: e.target.value,
                                                })
                                            }
                                            variant='outlined'
                                            margin='normal'
                                            fullWidth
                                        />

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            <Select
                                                id='budget-currency'
                                                name='budget-currency'
                                                value={listing.budget.currency}
                                                onChange={(e) =>
                                                    setListing({
                                                        ...listing,
                                                        budget: {
                                                            ...listing.budget,
                                                            currency:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                                variant='outlined'
                                                margin='normal'
                                                sx={{ mt: 1 }}
                                            >
                                                <MenuItem value='USD'>
                                                    USD
                                                </MenuItem>
                                                <MenuItem value='EUR'>
                                                    EUR
                                                </MenuItem>
                                                <MenuItem value='GBP'>
                                                    GBP
                                                </MenuItem>
                                                <MenuItem value='JPY'>
                                                    JPY
                                                </MenuItem>
                                                <MenuItem value='CNY'>
                                                    CNY
                                                </MenuItem>
                                            </Select>

                                            <TextField
                                                id='budget-amount'
                                                name='budget-amount'
                                                label='Budget'
                                                type='number'
                                                value={listing.budget.amount}
                                                required
                                                onChange={(e) =>
                                                    setListing({
                                                        ...listing,
                                                        budget: {
                                                            ...listing.budget,
                                                            amount: e.target
                                                                .value,
                                                        },
                                                    })
                                                }
                                                variant='outlined'
                                                margin='normal'
                                                fullWidth
                                            />
                                        </Box>

                                        <TextField
                                            id='description'
                                            name='description'
                                            label='Description'
                                            required
                                            value={listing.description}
                                            onChange={(e) =>
                                                setListing({
                                                    ...listing,
                                                    description: e.target.value,
                                                })
                                            }
                                            variant='outlined'
                                            margin='normal'
                                            fullWidth
                                        />

                                        <Autocomplete
                                            multiple
                                            id='tags'
                                            name='tags'
                                            options={TAGS}
                                            value={listing.tags}
                                            onChange={(event, value) =>
                                                setListing({
                                                    ...listing,
                                                    tags: value,
                                                })
                                            }
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            filterSelectedOptions
                                            fullWidth
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant='outlined'
                                                    label='Tags'
                                                    placeholder='Select tags'
                                                    margin='normal'
                                                    fullWidth
                                                />
                                            )}
                                        />

                                        <label htmlFor='fromDateTime'>
                                            From:
                                        </label>
                                        <input
                                            id='fromDateTime'
                                            name='fromDateTime'
                                            type='datetime-local'
                                            value={listing.fromDateTime}
                                            onChange={(e) =>
                                                setListing({
                                                    ...listing,
                                                    fromDateTime:
                                                        e.target.value,
                                                })
                                            }
                                        />

                                        <label htmlFor='toDateTime'>To:</label>
                                        <input
                                            id='toDateTime'
                                            name='toDateTime'
                                            type='datetime-local'
                                            value={listing.toDateTime}
                                            onChange={(e) =>
                                                setListing({
                                                    ...listing,
                                                    toDateTime: e.target.value,
                                                })
                                            }
                                        />

                                        <Button
                                            type='submit'
                                            variant='contained'
                                            sx={{
                                                mt: '2rem',
                                                borderRadius: '50px',
                                                bgcolor: lMode3,
                                            }}
                                            onClick={handleSubmitListing}
                                        >
                                            Add Listing
                                        </Button>
                                    </Box>
                                </form>
                            </Box>

                            {/* To view your Listings */}

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    p: 3,
                                    marginLeft: '2rem',
                                    borderRadius: '1rem',
                                    bgcolor: mode === 'light' ? lMode2 : dMode2,
                                    boxShadow: 2,
                                    flex: 1,
                                }}
                            >
                                <ExplorerListings
                                    mode={mode}
                                    shift={shift}
                                    onDeleteListing={handleDeleteListing}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                width: '100%',
                                p: 2,
                            }}
                        >
                            {/* To filter Listings */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    p: 3,
                                    borderRadius: '1rem',
                                    bgcolor: mode === 'light' ? lMode2 : dMode2,
                                    boxShadow: 2,
                                }}
                            >
                                <Typography
                                    variant='h2'
                                    component='h3'
                                    sx={{
                                        color:
                                            mode === 'light' ? lMode6 : dMode6,
                                        margin: '2rem',
                                        fontFamily: 'Work Sans',
                                        fontWeight: 'medium',
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    Filter through Listings
                                </Typography>
                                <hr
                                    style={{
                                        width: '100%',
                                        height: '1px',
                                        backgroundColor: '#000',
                                        border: 'none',
                                    }}
                                ></hr>
                                <Box sx={{ width: 300 }}>
                                    {/* City Filter */}
                                    <FormControl fullWidth sx={{ my: 2 }}>
                                        <TextField
                                            id='city'
                                            name='city'
                                            label='City'
                                            value={city}
                                            onChange={handleCityChange}
                                            variant='outlined'
                                            margin='normal'
                                            fullWidth
                                        />
                                    </FormControl>

                                    {/* Price Filter */}
                                    <Box sx={{ mb: 2 }}>
                                        <Typography
                                            variant='body1'
                                            gutterBottom
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Price Range: ${priceRange[0]} - $
                                            {priceRange[1]}
                                        </Typography>
                                        <Slider
                                            value={priceRange}
                                            onChange={handlePriceRangeChange}
                                            valueLabelDisplay='auto'
                                            min={0}
                                            max={1000}
                                            step={10}
                                        />
                                    </Box>

                                    {/* Tags Filter */}

                                    <Autocomplete
                                        multiple
                                        id='tags'
                                        name='tags'
                                        options={TAGS}
                                        value={listing.tags}
                                        onChange={(event, value) =>
                                            setListing({
                                                ...listing,
                                                tags: value,
                                            })
                                        }
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        filterSelectedOptions
                                        fullWidth
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant='outlined'
                                                label='Tags'
                                                placeholder='Select tags'
                                                margin='normal'
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Box>
                            </Box>

                            {/* To view Listings */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    p: 3,
                                    marginLeft: '2rem',
                                    borderRadius: '1rem',
                                    bgcolor: mode === 'light' ? lMode2 : dMode2,
                                    boxShadow: 2,
                                    flex: 1,
                                }}
                            >
                                <PhotographerListings
                                    mode={mode}
                                    city={city}
                                    priceRange={priceRange}
                                    selectedTags={selectedTags}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
