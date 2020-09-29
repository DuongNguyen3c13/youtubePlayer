import React, {useEffect, useState} from "react";
import axios from 'axios';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import {Pagination} from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
// core components
import Table from '../../components/Table/Table';

import styles from "../../../src/assets/jss/material-dashboard-react/views/enquiryStyle.js";

const useStyles = makeStyles(styles);

export default function Enquiry() {
    const classes = useStyles();
    const [enquiries, setEnquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getEnquiries = async (page) => {
            setLoading(true);
            const response = await axios.get('/api/v1/enquiry?page=' + page);
            setEnquiries(response.data.payload?.enquiries);
            setLoading(false);
            setCurrentPage(response.data.payload?.currentPage);
            setPageCount(response.data.payload?.lastPage);
        };
        getEnquiries(currentPage);
    },[currentPage]);
    return (
        <div>
            <Table
                tableHead={[
                    ['#', '#'],
                    ['email', 'Email'],
                    ['topic', 'Topic'],
                    ['role', 'Role'],
                    ['comment', 'Comment'],
                    ['created_at', 'Created at'],
                ]}
                tableData={enquiries}
                customClasses={classes}
            />
            <Pagination
                showFirstButton
                showLastButton
                page={currentPage}
                count={pageCount}
                onChange={(e, page) => setCurrentPage(page)}
            />
            <Backdrop
                className={classes.backdrop}
                open={loading === true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
