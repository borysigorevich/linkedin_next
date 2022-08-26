import {ComponentType} from "react";

export type HeaderLinkType = {
    Icon: ComponentType<{className: string}>
    text: string
    hidden?: boolean
    avatar?: boolean
}