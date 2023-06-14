// React
import React from 'react';

// Material UI Components
import { Paper } from '@mui/material';

// Components
import PeerInRoom from './PeerInRoom';

export default function PeersContainer({ peers }) {
    return (
        <Paper
            sx={{
                p: 2,
                width: '100%',
                mb: '1rem',
                overflowY: 'auto',
                display: 'grid',
                borderRadius: 5,
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                gridAutoFlow: 'dense',
                backgroundColor: 'transparent',
                border: '2px solid #fff',
                flexGrow: 1,
            }}
        >
            {peers &&
                peers.map((peer) => <PeerInRoom key={peer.id} peer={peer} />)}
        </Paper>
    );
}
