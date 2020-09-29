// @material-ui/icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// core components/views for Admin layout
import Dashboard from "./views/Dashboard/Dashboard";

const dashboardRoutes = [
    {
        path: "/songs",
        name: "Songs",
        icon: CloudUploadIcon,
        component: Dashboard,
        layout: ""
    },
];

export default dashboardRoutes;
