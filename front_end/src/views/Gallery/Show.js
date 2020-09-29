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
    const [banner, setBanner] = useState([]);
    const [squareBanner, setSquareBanner] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);
    const [shopId, setShopId] = useState();
    const [loading, setLoading] = useState(false)
    const [uploadResult, setUploadResult] = useState();
    const history = useHistory();

    const showShopImages = () => {
        if (shopId === undefined) {
            alert('Shop ID is required');
            return false;
        }
        let formData = new FormData();
        formData.append(
            "shop_id",
            shopId
        );

        setLoading(true);
        setBanner([]);
        setSquareBanner([]);
        setGallery([]);
        document.getElementById('new-images').value = '';
        document.getElementById('banner').value = '';
        document.getElementById('square-banner').value = '';
        axios
            .post(`/api/v1/gallery/show`, formData)
            .then(({data}) => {
                {Object.entries(data.payload).forEach(([key, value]) => {
                    if (value === null) {
                        return;
                    }
                    if (key === 'banner') {
                        setBanner(value.value);
                    } else if (key === 'squareBanner') {
                        setSquareBanner(value.value);
                    } else if (key === 'galleryImages') {
                        setGallery(value);
                    }
                })}
                setLoading(false);
            }).catch((error) => {
                alert(error)
                alert('Something went wrong!!')
                setLoading(false);
            });
    }

    const handleUpdate = (e) => {
        if (shopId === undefined) {
            alert('Shop ID is required');
            return false;
        }
        let formData = new FormData();
        formData.append(
            "shop_id",
            shopId
        );
        {Object.entries(imageFiles).forEach(([key, imageFile]) => {
            if (imageFile[0] === 'banner') {
                formData.append(
                    "banner",
                    imageFile[1]
                );
            } else if (imageFile[0] === 'square_banner') {
                formData.append(
                    "square_banner",
                    imageFile[1]
                );
            } else if (imageFile[0] === 'existing_images') {
                formData.append(
                    "existing_images["  + imageFile[2] +"]",
                    imageFile[1]
                );
            }
        })}
        formData.append(
            "delete_images",
            deleteImages
        );

        for (let i = 0; i < newImages.length; i++) {
            formData.append(
                "images[]",
                newImages[i],
                newImages[i].name,
            );
        }

        setLoading(true);
        setDeleteImages([]);
        axios
            .post(`/api/v1/gallery/update`, formData)
            .then(({data}) => {
                if (data.success) {
                    setUploadResult('Images uploaded successfully')
                } else {
                    setUploadResult('Images uploaded failed, error ' + data.message)
                }
                showShopImages();
            }).catch((error) => {
            alert('Something went wrong!')
                showShopImages();
            });
    }

    const handleShopId = (e) => {
        setShopId(e.target.value);
    }

    const handleFile = (e) => {
        let file = e.target.files[0];
        setImageFiles([...imageFiles, [e.target.getAttribute('data-name'), file, e.target.getAttribute('data-id')]]);
    }

    const handleFiles = (e) => {
        let files = e.target.files;
        setNewImages(files);
    }
    const handleSelectDelete = (e) => {
        if (e.target.checked) {
            setDeleteImages([...deleteImages, e.target.getAttribute('data-id')]);
        } else {
            deleteImages.splice(deleteImages.indexOf(e.target.getAttribute('data-id')), 1);
            setDeleteImages(deleteImages);
        }
    }
    const redirectToGallery = () => {
        let path = `/gallery`;
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

            <div>
                <Button
                    className={classes.uploadButton}
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={showShopImages}
                >
                    Find
                </Button>
                <Button
                    className={`${classes.ml10} ${classes.mt15}`}
                    variant="contained"
                    color="secondary"
                    component="span"
                    onClick={redirectToGallery}
                >
                    Back
                </Button>
            </div>
            <div className={banner.length > 0 ? '' : classes.none}>
                <div className={classes.imageList}>
                    <img alt="banner" src={banner} className={classes.imageList} />
                    <label>Banner</label>
                    <input type="file" id="banner" data-name="banner" onChange={handleFile}/>
                </div>
                <div className={classes.imageList}>
                    <img alt="square-banner" src={squareBanner} className={classes.imageList}/>
                    <label>Square Banner</label>
                    <input type="file" id="square-banner" data-name="square_banner" onChange={handleFile}/>
                </div>
                {gallery.map((image, key) => {
                    return (
                        <div className={classes.imageList}>
                            <img alt="square-banner" src={image.value} className={classes.imageList} />
                            <label>Gallery Image {key + 1}</label>
                            <input className={classes.ml10} type="checkbox" id={`${'delete_' + image.id}`} data-id={image.id} onChange={handleSelectDelete} />
                            <label htmlFor={`${'delete_' + image.id}`}>Delete this image</label>
                            <input type="file" data-name="existing_images" data-id={image.id} onChange={handleFile} />
                        </div>
                    )
                })}
                <div className={classes.mt15}>
                    <label>Add more images</label>
                    <input
                        className={classes.ml10}
                        id="new-images"
                        type="file"
                        name="images[]"
                        multiple
                        onChange={handleFiles}/>
                </div>
                <Button
                    className={classes.uploadButton}
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={handleUpdate}
                >
                    Update shop images
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
