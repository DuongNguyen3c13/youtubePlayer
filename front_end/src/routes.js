// @material-ui/icons
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import FilterIcon from '@material-ui/icons/Filter';

// core components/views for Admin layout
import Video from "./views/Video/index";
import VideoCreate from "./views/Video/Create";
import VideoEdit from "./views/Video/Edit";
import Banner from "./views/Banner/index";
import BannerCreate from "./views/Banner/Create";
import BannerEdit from "./views/Banner/Edit";

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
    {
        path: "/banners/create",
        name: "Banners",
        icon: '',
        isSub: true,
        component: BannerCreate,
        layout: ""
    },
    {
        path: "/banners/:id/edit",
        name: "Banners",
        icon: '',
        isSub: true,
        component: BannerEdit,
        layout: ""
    },
    {
        path: "/banners",
        name: "Banners",
        icon: FilterIcon,
        component: Banner,
        layout: ""
    },
];

export default dashboardRoutes;
