// @material-ui/icons
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

// core components/views for Admin layout
import Video from "./views/Video/index";
import VideoCreate from "./views/Video/Create";
import VideoEdit from "./views/Video/Edit";

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
        path: "/videos/:id/edit",
        name: "Videos",
        icon: '',
        isSub: true,
        component: VideoEdit,
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
