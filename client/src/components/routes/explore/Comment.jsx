import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment }) => {
    return (
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar alt={comment.userName} src={comment.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={comment.userName}
                secondary={
                    <>
                        <span>{comment.commentText}</span>
                        <br />
                        <span>
                            {formatDistanceToNow(new Date(comment.commentAt), {
                                addSuffix: true,
                            })}
                        </span>
                    </>
                }
            />
        </ListItem>
    );
};

export default Comment;
