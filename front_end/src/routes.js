// @material-ui/icons
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

// core components/views for Admin layout
import Video from "./views/Video/index";

const dashboardRoutes = [
    {
        path: "/videos",
        name: "Videos",
        icon: LibraryMusicIcon,
        component: Video,
        layout: ""
    },
];

export default dashboardRoutes;
