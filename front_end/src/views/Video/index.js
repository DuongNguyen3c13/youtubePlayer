import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";

// @material-ui
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {Pagination} from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

// core components
import Table from "./../../components/Table/Table";
import styles from "../../../src/assets/jss/material-dashboard-react/views/stallStyle.js";
const useStyles = makeStyles(styles);

export default function Video() {
    const classes = useStyles();
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Button
                className={classes.mr10}
                variant="contained"
                color="primary"
                component="span"
                onClick={() => {window.location.href = "/videos/create"}}
            >
                Add a new video
            </Button>
            {/*{tableData.length > 0 &&*/}
            {/*<div>*/}
            {/*    <Table*/}
            {/*        tableHead={[*/}
            {/*            ["shop_id", "Shop ID"],*/}
            {/*            ["name", "name"],*/}
            {/*            ["status", "Status"],*/}
            {/*            ["action", "Action"],*/}
            {/*        ]}*/}
            {/*        customClasses={classes}*/}
            {/*        tableData={tableData}*/}
            {/*    />*/}
            {/*    <Pagination*/}
            {/*        showFirstButton*/}
            {/*        showLastButton*/}
            {/*        page={currentPage}*/}
            {/*        count={pageCount}*/}
            {/*        onChange={(e, page) => setCurrentPage(page)}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*}*/}
            {/*<Backdrop*/}
            {/*    className={classes.backdrop}*/}
            {/*    open={loading === true}>*/}
            {/*    <CircularProgress color="inherit" />*/}
            {/*</Backdrop>*/}
        </div>
    )
}
