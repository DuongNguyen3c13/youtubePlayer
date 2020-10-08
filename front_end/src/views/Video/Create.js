import React, {useState} from "react";
import axios from "axios";

// @material-ui
import { makeStyles } from "@material-ui/core/styles";

// core components
import Form from './form';
import styles from '../../../src/assets/jss/material-dashboard-react/views/videoStyle';
const useStyles = makeStyles(styles);

export default function VideoCreate() {
    const classes = useStyles();
    const [name, setName] = useState();
    const [link, setLink] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [result, setResult] = useState('');

    function handleFormAction() {
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
            <Form
                classes={classes}
                button='Create'
                setName={setName}
                setLink={setLink}
                setThumbnail={setThumbnail}
                name={name}
                link={link}
                thumbnail={thumbnail}
                handleFormAction={handleFormAction}
            />
            <div className={classes.mt20}>{result}</div>
        </div>
    )
}
