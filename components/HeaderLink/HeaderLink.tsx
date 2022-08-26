import React, {ComponentType, memo, useEffect, useState} from 'react';
import {useSession, signOut} from 'next-auth/react';
import {useTheme} from "next-themes";

import {SxProps} from '@mui/material/styles'

import {Link, Avatar, Image} from '@common'

type HeaderLinkProps = {
    // href: string
    Icon: ComponentType<{ className: string }>
    text: string
    avatar?: boolean
    feed?: boolean
    active?: boolean
    hidden?: boolean
}

const AvatarStyles: (active: boolean | undefined, isHover: boolean, theme: string) => SxProps = (active, isHover, theme) => ({
    transition: '.3s',
    bgcolor: `${(active || isHover)
        ? theme === 'dark'
            ? '#fff'
            : '#000'
        : theme === 'dark' ? 'rgb(255,255,255 / 75)' : 'rgb(0,0,0/60)'}`,
    color: theme === 'dark' ? 'gray' : 'white',
    ':hover': {bgcolor: theme === 'dark' ? '#fff' : '#000'}
})

const HeaderLink = ({Icon, text, avatar, feed, active, hidden}: HeaderLinkProps) => {
    const [isHover, setIsHover] = useState(false) //for Avatart
    const {resolvedTheme} = useTheme()
    const {data} = useSession()

    const [mounted, setMounted] = useState(false)

    const handleHover = () => {
        if (avatar) setIsHover(true)
    }
    const handleLeave = () => {
        if (avatar) setIsHover(false)
    }

    useEffect(() => setMounted(true), [])

    return (
        <Link href={`/?section=${text}`}>
            <a
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className={`${hidden && 'hidden md:flex'} flex flex-col items-center justify-center gap-1 ${feed ? 'text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1' : 'text-gray-500 hover:text-gray-700'} ${active && '!text-black dark:!text-white'}`}
            >
                {avatar
                    ? mounted &&
                    <div className={'relative h-7 w-7 rounded-full overflow-hidden cursor-pointer bg-white mt-1 -mb-1'}
                         onClick={() => signOut()}>
                        <Image
                            src={data?.user?.image!}
                            layout={'fill'}
                            objectFit={'contain'}
                        />
                    </div>

                    : <Icon className={'!h-7 !w-7 lg:!-mb-1'}/>}
                <h4 className={`text-sm ${feed && 'hidden lg:block'}`}>{text}</h4>

                {/*{active && <span className={'hidden lg:inline-flex w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full h-0.5'}/>}*/}
                <span
                    className={`hidden left-0 -bottom-1 lg:inline-flex w-${active ? '[calc(100%+20px)]' : 0} transition-all duration-300 bg-black dark:bg-white rounded-t-full h-0.5`}/>
            </a>
        </Link>
    );
};

export default memo(HeaderLink)

// before:absolute before:h-0.5 before:${active ? 'w-full' : 'w-0'} before:rounded-t-full before:transition-all before:-bottom-1 before:left-0 before:bg-black