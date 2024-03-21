// ImagePopup.js

import {
    Box,
    Dialog,
    Grid,
    IconButton,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeComment from '@mui/icons-material/ModeComment';

const ImagePopup = ({ open, handleClose, post }) => {
    const generateFakeComments = () => {
        const comments = [];
        for (let i = 0; i < 2; i++) {
            const comment = {
                commentBy: `user${i + 1}`, // Assuming user IDs are in the format "user1", "user2", ...
                commentAt: new Date().toISOString(), // Using the current date and time
                commentText: `This is comment ${i + 1}`, // Generating a comment text
            };
            comments.push(comment);
        }
        console.log(comments);
        return comments;
    };
    const fakecomments = generateFakeComments();
    // Example usage
    // if (post) post.comments = generateFakeComments();
    return (
        post && (
            <Dialog open={open} onClose={handleClose}>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={6}
                            sx={{ position: 'sticky', left: 0, top: 0 }}
                        >
                            <img
                                src={post.imageUrl}
                                alt={`Image`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                <List>
                                    {fakecomments.map((comment, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={comment.commentText}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                <Box
                                    sx={{
                                        position: 'sticky',
                                        bottom: 0,
                                        backgroundColor: '#fff',
                                        padding: '10px',
                                        borderTop:
                                            fakecomments.length > 0
                                                ? '1px solid #ccc'
                                                : 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IconButton sx={{ color: '#000' }}>
                                            <FavoriteIcon />
                                        </IconButton>
                                        <Typography variant='body2'>
                                            {post.likes} Likes
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <TextField
                                            label='Add a comment'
                                            variant='outlined'
                                            fullWidth
                                            size='small'
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        )
    );
};

export default ImagePopup;
