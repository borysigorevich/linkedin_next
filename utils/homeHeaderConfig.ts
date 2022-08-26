import {ComponentType} from "react";

import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

import {HeaderLinkType} from "@types";

export const headerLinksConfig: HeaderLinkType[] = [
    {
        Icon: ExploreIcon,
        text: 'Discover'
    },
    {
        Icon: GroupIcon,
        text: 'People'
    },
    {
        Icon: OndemandVideoIcon,
        text: 'Learning'
    },
    {
        Icon: BusinessCenterIcon,
        text: 'Jobs'
    },
]