import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// core components
import styles from '../../../src/assets/jss/material-dashboard-react/views/videoStyle';
import Form from "./form";
const useStyles = makeStyles(styles);

export default function VideoEdit(props) {
    const classes = useStyles;
    const [name, setName] = useState();
    const [link, setLink] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [result, setResult] = useState('');
    const param = props.match.params.id;

    useEffect(() => {
        axios.get(`/api/v1/videos/` + param)
            .then((response) => {
                setName(response.data.payload[1]);
                setLink(response.data.payload[2]);
                setThumbnail(response.data.payload[3]);
            })
    }, []);

    function handleFormAction() {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("link", link);
        formData.append("thumbnail", thumbnail);
        formData.append('_method', 'PUT')
        axios
            .post(`/api/v1/videos/` + 666, formData)
            .then(({data}) => {
                if (data.success) {
                    setResult('Updated video successfully');
                } else {
                    setResult('Failed to update video');
                }
            }).catch((error) => {
                setResult('Failed to update video, ' + error);
            })
    }

    return (
        <div className={classes.formInput}>
            <Form
                classes={classes}
                button='Update'
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
