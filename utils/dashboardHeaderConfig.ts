import {HeaderLinkType} from "@types";

import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppsIcon from '@mui/icons-material/Apps';

import {Avatar} from '@common'

export const dashboardHeaderConfig: HeaderLinkType[] = [
    {
        Icon: HomeRoundedIcon,
        text: 'Home',
    },
    {
        Icon: GroupIcon,
        text: 'My Network',
    },
    {
        Icon: BusinessCenterIcon,
        text: 'Jobs',
        hidden: true
    },
    {
        Icon: ChatIcon,
        text: 'Messaging',
    },
    {
        Icon: NotificationsIcon,
        text: 'Notifications',
    },
    {
        Icon: Avatar,
        text: 'Me',
        hidden: true,
        avatar: true
    },
    {
        Icon: AppsIcon,
        text: 'Work',
        hidden: true
    },
]