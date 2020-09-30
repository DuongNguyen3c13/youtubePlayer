// @material-ui/icons
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

// core components/views for Admin layout
import Video from "./views/Video/index";
import VideoCreate from "./views/Video/Create";

const dashboardRoutes = [
    {
        path: "/videos/create",
        name: "Videos",
        icon: '',
        isSub: true,
        component: VideoCreate,
        layout: ""
    },
    {
        path: "/videos",
        name: "Videos",
        icon: LibraryMusicIcon,
        component: Video,
        layout: ""
    },
];

export default dashboardRoutes;
