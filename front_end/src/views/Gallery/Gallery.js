import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// @material-ui
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import styles from "../../../src/assets/jss/material-dashboard-react/views/galleryStyle.js";

const useStyles = makeStyles(styles);

export default function Gallery() {
    const classes = useStyles();
    const [imageFiles, setImageFiles] = useState([]);
    const [shopId, setShopId] = useState();
    const [uploadResult, setUploadResult] = useState();
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleFile = (e) => {
        let files = e.target.files;
        setImageFiles(files);
    }

    const handleSubmit = () => {
        if (shopId === undefined) {
            alert('Shop ID is required');
            return false;
        }
        let missingBanner = true;
        let missingSquareBanner = true;
        let formData = new FormData();

        for (let i = 0; i < imageFiles.length; i++) {

            let fileName = imageFiles[i].name;
            if (fileName.substring(0, fileName.lastIndexOf('.')) === 'shop_banner_img') {
                missingBanner = false;
            }
            if (fileName.substring(0, fileName.lastIndexOf('.')) === 'shop_banner_img_square') {
                missingSquareBanner = false;
            }
            formData.append(
                "images[]",
                imageFiles[i],
                imageFiles[i].name
            );
        }
        if (missingBanner) {
            alert('Missing banner');
            return false;
        }
        if (missingSquareBanner) {
            alert('Missing square banner');
            return false;
        }

        formData.append(
            "shop_id",
            shopId
        );

        setLoading(true);
        axios
            .post(`/api/v1/gallery/`, formData)
            .then(({data}) => {
                if (data.success) {
                    setUploadResult('Images uploaded successfully')
                } else {
                    setUploadResult('Images uploaded failed, error ' + data.message)
                }
                setLoading(false);
            }).catch((error) => {
                setUploadResult('Images upload failed, error ' + error)
                setLoading(false);
            });
    }

    const handleShopId = (e) => {
        setShopId(e.target.value);
    }

    const redirectToShowShopImage = () => {
        let path = `/gallery/show`;
        history.push(path);
    }

    return (
        <div>
            <div className={classes.formGroup}>
                <label className={classes.inputLabel} htmlFor="shopIDInput">Shop ID</label>
                <input
                    type="text"
                    className={classes.formControl}
                    placeholder="Enter shop ID"
                    onChange={handleShopId}
                />
            </div>
            <input
                id="images"
                name="images[]"
                multiple
                type="file"
                onChange={handleFile}
            />

            <div>
                <Button
                    className={classes.uploadButton}
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    className={classes.showImagesButton}
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={redirectToShowShopImage}
                >
                    Show shop images
                </Button>
            </div>
            <div className={classes.mt15}>
                {uploadResult}
            </div>
            <Backdrop
                className={classes.backdrop}
                open={loading === true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
