import React, {useState, useEffect} from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ImageIcon from '@material-ui/icons/Image';
import {Button, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";

// core components
import styles from '../../../src/assets/jss/material-dashboard-react/views/bannerStyle';
const useStyles = makeStyles(styles);

export default function BannerEdit(props) {
    const classes = useStyles();
    const SMALL_BANNER = 'small';
    const LARGE_BANNER = 'large';
    const [file, setFile] = useState([]);
    const [type, setType] = useState('');
    const [result, setResult] = useState('');
    const param = props.match.params.id;

    useEffect(() => {
        axios.get(`/api/v1/banners/` + param)
            .then((response) => {
                setType(response.data.payload.type)
            })
    }, []);

    function selectType(type) {
        setType(type);
    }

    function handleFormAction() {
        let formData = new FormData();

        for (let i = 0; i < file.length; i++) {
            formData.append(
                "files[]",
                file[i],
                file[i].name
            );
        }
        formData.append("type", type);
        formData.append('_method', 'PUT')

        axios
            .post(`/api/v1/banners/` + param, formData)
            .then(({data}) => {
                if (data.success) {
                    setResult('Updated banner successfully');
                } else {
                    setResult('Failed to update banner');
                }
            }).catch((error) => {
            setResult('Failed to update banner, ' + error);
        })
    }
    function handleFile(e) {
        let fileUploaded = e.target.files;
        setFile(fileUploaded);
    }

    return (
        <div className={classes.formInput}>
            <FormControl className={classes.formControl}>
                <RadioGroup aria-label="system" onChange={(e) => selectType(e.target.value)}>
                    <FormControlLabel value={SMALL_BANNER} control={<Radio/>} checked={type === SMALL_BANNER ? 'checked' : ''} label="Small banner"/>
                    <FormControlLabel value={LARGE_BANNER} control={<Radio/>} checked={type === LARGE_BANNER ? 'checked' : ''} label="Large banner"/>
                </RadioGroup>
            </FormControl>
            <input
                accept="image/*"
                className={classes.none}
                id="file-upload"
                type="file"
                onChange={(e) => handleFile(e)}
            />
            <div className={classes.uploadButton}>
                <label htmlFor="file-upload">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<ImageIcon />}
                    >
                        Choose files
                    </Button>
                </label>
                <Button
                    className={`${classes.ml10}`}
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={handleFormAction}
                >
                    Update
                </Button>
                <Button
                    className={classes.ml10}
                    variant="contained"
                    color="secondary"
                    component="span"
                    onClick={() => window.location.href = "/banners"}
                >
                    List
                </Button>
            </div>
            <div className={classes.mt20}>{result}</div>
        </div>
    )
}
