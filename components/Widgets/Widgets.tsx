import React from 'react';
import TimeAgo from 'timeago-react'

import {NewsType} from "@types";
import {Image} from '@common'


import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InfoIcon from '@mui/icons-material/Info';

type WidgetsProps = {
    articles: NewsType[]
}

export const Widgets = ({articles}: WidgetsProps) => {

    return (
        <div className={'hidden lg:inline space-y-2'}>
            <div
                className={'bg-white dark:bg-[#1d2226] py-2.5 rounded-lg space-y-2 w-full overflow-hidden border border-gray-300 dark:border-0'}>
                <div className={'flex justify-between items-center px-2.5 font-bold'}>
                    <h4>Linkedin News</h4>
                    <InfoIcon className={'w-5 h-5'}/>
                </div>

                <div className={'space-y-1'}>
                    {articles.slice(0, 5).map(article => (
                        <div key={article.url}
                             className={'flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 pt-1'}>
                            <FiberManualRecordIcon className={'w-2 h-2'}/>
                            <div>
                                <h5 className={'max-w-[220px] text-sm truncate pr-2 font-medium'}>{article.title}</h5>
                                <TimeAgo datetime={article.publishedAt}
                                         className={'text-xs mt-0.5 dark:text-white/75 opacity-80 ml-auto'}/>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div
                className={'bg-white dark:bg-[#1d2226] h-48 px-2.5 rounded-lg sticky top-20 border border-gray-300 dark:border-0'}>
                <div className={'relative w-full h-full'}>
                    <Image
                        src={'https://rb.gy/kbfeaa'}
                        layout={'fill'}
                        objectFit={'contain'}
                        priority
                    />
                </div>
            </div>

        </div>
    );
};