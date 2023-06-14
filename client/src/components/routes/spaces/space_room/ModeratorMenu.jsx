// React
import React, { useState } from 'react';

// Material UI Components
import {
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    ListItemText,
} from '@mui/material';

// Material UI Icons
import {
    MoreVert as MoreVertIcon,
    Mic as MicIcon,
    MicOff as MicOffIcon,
    RemoveModerator as RemoveModeratorIcon,
    AddModerator as AddModeratorIcon,
} from '@mui/icons-material';

// 100ms Live Video React
import {
    useHMSActions,
    useHMSStore,
    selectLocalPeer,
} from '@100mslive/hms-video-react';

export default function ModeratorMenu({ peer, audioEnabled }) {
    const hmsActions = useHMSActions();
    const localPeer = useHMSStore(selectLocalPeer);
    const isModerator = localPeer.roleName === 'moderator';
    // Menu anchor
    const [anchorEl, setAnchorEl] = useState(null);

    const mutePeer = () => {
        if (isModerator) {
            hmsActions.setRemoteTrackEnabled(peer.audioTrack, false);
        }
    };

    const changeRole = (role) => {
        hmsActions.changeRoleOfPeer(peer.id, role, true);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isModerator && (
                <>
                    {/* Trigger button */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '6px',
                            right: '8px',
                        }}
                        onClick={handleMenuClick}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    {/* Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {/* Item 1 */}
                        <Tooltip
                            placement='top'
                            title={
                                audioEnabled
                                    ? `Mute ${peer.name.split('@')[0]}`
                                    : `Users cannot be unmuted, only muted`
                            }
                        >
                            <MenuItem
                                onClick={audioEnabled ? mutePeer : undefined}
                            >
                                {audioEnabled ? <MicIcon /> : <MicOffIcon />}
                                <ListItemText
                                    sx={{ ml: 1 }}
                                    primary={audioEnabled ? 'Unmuted' : 'Muted'}
                                />
                            </MenuItem>
                        </Tooltip>

                        {/* Item 2 */}
                        <Tooltip
                            title={`Make ${peer.name.split('@')[0]} a ${
                                peer.roleName === 'participant'
                                    ? 'moderator'
                                    : 'participant'
                            }`}
                        >
                            <MenuItem
                                onClick={() =>
                                    changeRole(
                                        peer.roleName === 'participant'
                                            ? 'moderator'
                                            : 'participant'
                                    )
                                }
                            >
                                {peer.roleName === 'participant' ? (
                                    <AddModeratorIcon />
                                ) : (
                                    <RemoveModeratorIcon />
                                )}
                                <ListItemText
                                    sx={{ ml: 1 }}
                                    primary={`Make ${
                                        peer.roleName === 'participant'
                                            ? 'Moderator'
                                            : 'Participant'
                                    }`}
                                />
                            </MenuItem>
                        </Tooltip>
                    </Menu>
                </>
            )}
        </>
    );
}
