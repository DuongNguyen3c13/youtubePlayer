import React, {useState, useEffect} from "react";
import axios from "axios";

// @material-ui
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from '../../../src/assets/jss/material-dashboard-react/views/videoStyle';
const useStyles = makeStyles(styles);

export default function VideoCreate() {
    const classes = useStyles;
    const [name, setName] = useState();
    const [link, setLink] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [result, setResult] = useState();

    function createVideo() {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("link", link);
        formData.append("thumbnail", thumbnail);
        axios
            .post(`/api/v1/videos`, formData)
            .then(({data}) => {
                if (data.success) {
                    setResult('Created video successfully');
                } else {
                    setResult('Failed to create video');
                }
            }).catch((error) => {
                setResult('Failed to create video, ' + error);
            })
    }

    return (
        <div className={classes.formInput}>
            <div>
                <TextField
                    margin='normal'
                    id="name"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    margin='normal'
                    id="link"
                    label="Link"
                    variant="outlined"
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    margin='normal'
                    id="thumb_nail"
                    label="Thumbnail"
                    variant="outlined"
                    onChange={(e) => setThumbnail(e.target.value)}
                />
            </div>
            <Button
                className={classes.mt20}
                variant="contained"
                color="primary"
                component="span"
                onClick={() => createVideo()}
            >
                Create
            </Button>
            <div className={classes.mt20}>{result}</div>
        </div>
    )
}
