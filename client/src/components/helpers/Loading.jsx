// React
import { useSelector } from 'react-redux';

// Material UI
import Backdrop from '@mui/material/Backdrop';

const Loading = () => {
    const loading = useSelector((state) => state.loading.isLoading);
    return (
        <Backdrop
            open={loading}
            sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
        >
            <img
                data-testid='loading-spinner'
                style={{ alignSelf: 'center', width: '160px', height: '160px' }}
                src='/assets/vectors/page-loading-1.svg'
                alt=''
            />
        </Backdrop>
    );
};

export default Loading;
