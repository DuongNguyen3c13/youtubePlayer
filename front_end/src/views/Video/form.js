import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, CardMedia } from '@material-ui/core';

export default function Form(props) {
    const {setName, setLink, setThumbnail, handleFormAction, name, link, thumbnail, button, classes} = props;
    return (
        <div>
            <div>
                <TextField
                    margin='normal'
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    margin='normal'
                    id="link"
                    label="Link"
                    variant="outlined"
                    value={link || ''}
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    margin='normal'
                    id="thumb_nail"
                    label="Thumbnail"
                    variant="outlined"
                    value={thumbnail || ''}
                    onChange={(e) => setThumbnail(e.target.value)}
                />
                <CardMedia
                    classes={classes.thumb}
                    image={thumbnail}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={handleFormAction}
            >
                {button}
            </Button>
            <Button
                className={classes.ml10}
                variant="contained"
                color="secondary"
                component="span"
                onClick={() => window.location.href = "/videos"}
            >
                List
            </Button>
        </div>
    )
}
