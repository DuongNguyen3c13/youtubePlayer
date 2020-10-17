import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";

// @material-ui
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {Pagination} from '@material-ui/lab';

// core components
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from "../../../src/assets/jss/material-dashboard-react/views/videoStyle.js";
import tableStyles from "../../../src/assets/jss/material-dashboard-react/components/tableStyle.js";
const useStyles = makeStyles(styles);
const useTableStyles = makeStyles(tableStyles);

export default function Banner() {
    const classes = useStyles();
    const tableClasses = useTableStyles();
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [tableHead, setTableHead] = useState([
        ["no", "#"],
        ["banner", "Banner"],
        ["type", "Type"],
        ["action", "Action"],
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [removeId, setRemoveId] = useState();
    const [removeResult, setRemoveResult] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/v1/banners?page=` + currentPage)
            .then((response) => {
                setTableData(response.data.payload.data);
                setPageCount(response.data.payload.last_page);
                setLoading(false);
            })
    }, [currentPage]);


    const handleCloseDialog = () => {
        setDialogOpen(false);
        setRemoveId(null);
    };

    const handleClickDelete = (id) => {
        setRemoveId(id);
        setDialogOpen(true);
    };

    const confirmDelete = () => {
        axios.delete(`api/v1/banners/` + removeId)
            .then((response) => {
                if (response.data.success) {
                    setTableData(response.data.payload.data);
                    setPageCount(response.data.payload.last_page);
                    setRemoveResult(true)
                } else {
                    setRemoveResult(false)
                }
            });
        setDialogOpen(false);
    };

    return (
        <div>
            <Button
                className={classes.mr10}
                variant="contained"
                color="primary"
                component="span"
                onClick={() => {window.location.href = "/banners/create"}}
            >
                Add a new banner
            </Button>
            <div
                className={classes.removeResult}
            >
                {removeResult !== null && (removeResult ? "Removed successfully!" : 'Failed to remove')}
            </div>
            {tableData.length > 0 &&
            <div>
                <Table className={tableClasses.table}>
                    <TableHead className={tableClasses["TableHeader"]}>
                        <TableRow className={tableClasses.tableHeadRow}>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        className={`${tableClasses.tableCell} ${tableClasses.tableHeadCell} ${classes[prop[0]]}`}
                                        key={key}
                                    >
                                        {prop[1]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((prop, key) => {
                            return (
                                <TableRow key={key} className={tableClasses.tableBodyRow}>
                                    {Object.entries(prop).map((item) => {
                                        return (
                                            <TableCell className={tableClasses.tableCell} key={key}>
                                                {item[0] === 'link' ? <img src={item[1]} width="100%"/> : item[1]}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell className={tableClasses.tableCell} key={key}>
                                        <EditIcon
                                            className={`${classes.actionCell} ${classes.editAction}`}
                                            onClick={() => {window.location.href = "/banners/" + prop.id + "/edit/"}}
                                        />
                                        <DeleteIcon
                                            className={`${classes.actionCell} ${classes.deleteAction}`}
                                            onClick={() => handleClickDelete(prop.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Dialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete this record?</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            No
                        </Button>
                        <Button onClick={confirmDelete} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Pagination
                    showFirstButton
                    showLastButton
                    page={currentPage}
                    count={pageCount}
                    onChange={(e, page) => setCurrentPage(page)}
                />
            </div>
            }
            <Backdrop
                className={classes.backdrop}
                open={loading === true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
