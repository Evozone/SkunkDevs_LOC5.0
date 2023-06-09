// Material UI Utils
import { styled } from '@mui/material/styles';

// Material UI components
import Swtich from '@mui/material/Switch';

export const StyledSwitch = styled(Swtich)(() => ({
    width: 65,
    height: 45,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 10,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            '& + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 25,
        height: 25,
    },
    '& .MuiSwitch-track': {
        borderRadius: 50 / 2,
    },
}));
