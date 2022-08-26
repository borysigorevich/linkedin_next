import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useTheme} from "next-themes";
import {motion} from 'framer-motion'

import {dashboardHeaderConfig, imgLoader} from "@utils";
import {HeaderLink} from "@components";
import {Image} from '@common'

import SearchIcon from '@mui/icons-material/Search';

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
}

export const DashboardHeader = () => {
    const router = useRouter()
    const {section} = router.query

    const [toggle, setToggle] = useState(false)
    const [mounted, setMounted] = useState(false)
    const {resolvedTheme, setTheme, theme} = useTheme()

    const handleToggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header
            className={'flex justify-around py-1.5 px-2 sticky top-0 z-40 bg-white dark:bg-[#1d2226] focus-within:shadow-lg transition-all'}>
            <div className={'flex items-center gap-2 max-w-xs w-full'}>
                {
                    mounted && <>
                        {resolvedTheme === 'dark'
                            ? <Image src="https://rb.gy/bizvqj" width={45} height={45}/>
                            : <Image loader={imgLoader} src="https://rb.gy/dpmd9s" width={45} height={45}/>
                        }
                    </>
                }

                <div className={'hidden sm:flex flex items-center space-x-1 dark:sm:bg-gray-700 py-2.5 px-4 rounded w-full'}>
                    <SearchIcon/>
                    <input type="text" placeholder={'Search'}
                           className={'bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow'}/>
                </div>
            </div>

            <div className={'flex items-center space-x-6'}>
                {
                    dashboardHeaderConfig.map(link => (
                        <HeaderLink
                            key={link.text}
                            Icon={link.Icon}
                            text={link.text}
                            avatar={link.avatar}
                            hidden={link.hidden}
                            active={section === link.text}
                            feed
                        />
                    ))
                }

                {
                    mounted && <div
                        className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer relative ${resolvedTheme === 'light' ? 'justify-start' : 'justify-end'}`}
                        onClick={handleToggleTheme}>
                        <span className="absolute left-0">🌜</span>
                        <motion.div
                            layout
                            transition={spring}
                            // className={`bg-white h-5 w-5 rounded-full transition-all absolute ${resolvedTheme === 'dark' ? 'right-0.5' : 'right-[calc(100%-22px)]'} z-10`}/>
                            className={`bg-white h-5 w-5 rounded-full relative z-10`}/>
                        <span className="absolute right-0.5">🌞</span>
                    </div>
                }

            </div>
        </header>
    );
};