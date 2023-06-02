import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

import {
    deepDark,
    light,
    medium,
    dark,
    richBlack,
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
} from '../../utils/colors';

export const CustomSwitcherGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    borderRadius: '50px',
    '& .MuiToggleButtonGroup-grouped': {
        margin: 0,
        border: 0,
        borderRadius: '50px',
        padding: '5px',
        width: '130px',
        '&:not(:first-of-type)': {
            borderRadius: '50px',
            border: `6px solid ${
                theme.palette.mode === 'light' ? lMode1 : dMode1
            }`,
        },
        '&:first-of-type': {
            borderRadius: '50px',
            border: `6px solid ${
                theme.palette.mode === 'light' ? lMode1 : dMode1
            }`,
        },
    },
    '& .MuiToggleButton-root': {
        outline: 'none',
        borderRadius: '50px',
        color: richBlack,
        font: '600 0.8rem Poppins, sans-serif',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? lMode2 : dMode2,
            color: 'black',
            transition: 'all 0.2s ease-in-out',
        },

        '&.Mui-selected': {
            backgroundColor: theme.palette.mode === 'light' ? lMode3 : dMode3,
            color: 'white',

            '&:hover': {
                backgroundColor:
                    theme.palette.mode === 'light' ? lMode4 : dMode4,
                color: 'white',
            },
        },
    },
}));

export const CustomSwitcherButton = styled(ToggleButton)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
}));
