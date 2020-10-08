import React, {useState, useRef} from "react";
import axios from "axios";

// @material-ui
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ImageIcon from '@material-ui/icons/Image';
import {Button, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";

// core components
import styles from '../../../src/assets/jss/material-dashboard-react/views/bannerStyle';
const useStyles = makeStyles(styles);

export default function BannerCreate() {
    const classes = useStyles();
    const SMALL_BANNER = 'small';
    const [files, setFiles] = useState();
    const [type, setType] = useState(SMALL_BANNER);
    const [result, setResult] = useState('');
    const [canUpload, setCanUpload] = useState(false);

    function handleFormAction() {
        let formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append(
                "files[]",
                files[i],
                files[i].name
            );
        }
        formData.append(
            "files",
            files,
        );
        formData.append(
            "type",
            type,
        );
        axios
            .post(`/api/v1/banners`, formData)
            .then(({data}) => {
                if (data.success) {
                    setResult('Created banner successfully');
                } else {
                    setResult('Failed to create banner');
                }
            }).catch((error) => {
                setResult('Failed to create banner, ' + error);
            })
    }

    function selectType(type) {
        setType(type);
    }
    function handleFiles(e) {
        let filesUploaded = e.target.files;
        setCanUpload(true);
        setFiles(filesUploaded);
    }

    return (
        <div className={classes.formInput}>
            <FormControl className={classes.formControl}>
                <RadioGroup aria-label="system" onChange={(e) => selectType(e.target.value)}>
                    <FormControlLabel value={SMALL_BANNER} control={<Radio/>} checked={type === SMALL_BANNER ? 'checked' : ''} label="Small banner"/>
                    <FormControlLabel value="large" control={<Radio/>} label="Large banner"/>
                </RadioGroup>
            </FormControl>
            <input
                accept="image/*"
                className={classes.none}
                id="file-upload"
                multiple
                type="file"
                onChange={(e) => handleFiles(e)}
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
                    className={`${classes.ml10} ${canUpload ? '' : classes.none}`}
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={handleFormAction}
                >
                    Upload
                </Button>
                <Button
                    className={classes.ml10}
                    variant="contained"
                    color="secondary"
                    componentmere="span"
                    onClick={() => window.location.href = "/banners"}
                >
                    List
                </Button>
            </div>
            <div className={classes.mt20}>{result}</div>
        </div>
    )
}
