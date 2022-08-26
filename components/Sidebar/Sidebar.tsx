import React from 'react';
import {useSession} from 'next-auth/react'

import {Image, Avatar} from '@common'

import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AddRounded from '@mui/icons-material/AddRounded';

export const Sidebar = () => {
    const {data, status} = useSession()

    return (
        <div className={'space-y-2 min-w-max max-w-lg'}>
            <div
                className={'bg-white dark:bg-[#1d2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-0'}>
                <div className={'relative w-full h-14'}>
                    <Image src="https://rb.gy/i26zak" layout="fill" objectFit={'cover'} priority/>
                </div>
                {/*<Avatar*/}
                {/*    src={data?.user?.image}*/}
                {/*    className={'!h-14 !w-14 !absolute !top-4 !cursor-pointer left-[calc(50%-28px)] '}*/}
                {/*/>*/}
                <div className={'absolute h-14 w-14 rounded-full overflow-hidden top-4 cursor-pointer left-[calc(50%-28px)]'}>
                    <Image
                        src={data?.user?.image!}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </div>

                <div className={'mt-5 py-4 space-y-0.5'}>
                    <h4 className={'hover:underline decoration-purple-700 underline-offset-1 cursor-pointer'}>{data?.user?.name}</h4>
                    <p className={'text-black/60 dark:text-white/75 text-sm'}>{data?.user?.email}</p>
                </div>

                <div className={'hidden md:inline text-left dark:text-white/75 text-sm '}>
                    <div className={'font-md sidebarButton space-y-0.5'}>
                        <div className={'flex justify-between space-x-2'}>
                            <h4>Who viewed your profile</h4>
                            <span className={'text-blue-500'}>321</span>
                        </div>
                        <div className={'flex justify-between space-x-2'}>
                            <h4>Views of your post</h4>
                            <span className={'text-blue-500'}>321</span>
                        </div>
                    </div>

                    <div className={'sidebarButton'}>
                        <h4 className={'leading-4 text-xs'}>
                            Access exclusive tools & insights
                        </h4>
                        <h4 className={'dark:text-white font-medium flex items-center'}>
                            <span
                                className={'w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1'}/>
                            Try premium for free
                        </h4>
                    </div>

                    <div className={'sidebarButton flex items-center space-x-1.5'}>
                        <BookmarkOutlinedIcon className={'!-ml-1'}/>
                        <h4 className={'dark:text-white font-medium'}>My Items</h4>
                    </div>
                </div>
            </div>

            <div
                className={'hidden md:flex border border-gray-300 dark:border-0 bg-white dark:bg-[#1d2226] text-black/70 dark:text-white/75 rounded-lg overflow-hiddden flex-col space-y-2 pt-2.5 sticky top-20'}>
                <p className={'sidebarLinks'}>Groups</p>
                <div className={'flex items-center justify-between'}>
                    <p className={'sidebarLinks'}>Events</p>
                    <AddRounded className={'!h-5'}/>
                </div>
                <p className={'sidebarLinks'}>Followed hashtags</p>
                <div className={'sidebarButton text-center'}>
                    <h4 className={'dark:text-white font-medium text-sm'}>Discover more</h4>
                </div>
            </div>
        </div>
    );
};