import theme from './theme';

const fileUploadStyle = {
    none : {
        display: "none",
    },
    system: {
        "& label": {
            display: "inline-flex",
            marginRight: "20px",
        }
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    uploadButton: {
        marginRight: theme.spacing(0),
    },
    inlineFlex: {
        display: "inline-flex",
    },
    uploadResult: {
        marginTop: theme.spacing(0),
    },
    mt10: {
        marginTop: theme.spacing(0),
    }
};

export default fileUploadStyle;
