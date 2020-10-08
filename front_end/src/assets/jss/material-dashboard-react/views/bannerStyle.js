import theme from "./theme";
import {
    dangerColor,
    successColor,
} from "../../material-dashboard-react.js";
const bannerStyle = {
    none: {
        display: 'none'
    },
    formInput: {
        marginBottom: '20px'
    },
    ml10: {
        marginLeft: theme.spacing(0)
    },
    mt20: {
        marginTop: theme.spacing(1)
    },
    mb20: {
        marginBottom: theme.spacing(1)
    },
    ml20: {
        marginLeft: theme.spacing(1)
    },
    backdrop: {
        color: "#fff",
    },
    no: {
        width: "30px"
    },
    actionCell: {
        '&:hover': {
            cursor: 'pointer',
            color: successColor[0]
        }
    },
    editAction: {
        '&:hover': {
            color: successColor[0]
        }
    },
    deleteAction: {
        '&:hover': {
            color: dangerColor[0]
        }
    },
    removeResult: {
        display: 'inline-flex',
        marginLeft: '15px',
    },
    thumb: {
        height: '30px',
        width: '30px',
    },
    uploadButton: {
        display: 'flex'
    },
};
export default bannerStyle;
