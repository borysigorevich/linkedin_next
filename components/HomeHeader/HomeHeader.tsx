import React from 'react';

import {signIn} from 'next-auth/react'

import {Image} from '@common'
import {headerLinksConfig, imgLoader} from "@utils";
import {HeaderLink} from "@components/HeaderLink";

export const HomeHeader = () => {
    return (
        <header className={'flex justify-around items-center py-4'}>
            <div className={'relative w-36 h-10'}>
                <Image
                    loader={imgLoader}
                    src="https://rb.gy/vtbzlp"
                    layout={'fill'}
                    objectFit={'contain'}
                />
            </div>

            <div className={'flex items-center sm:divide-x divide-gray-300'}>
                <div className={'hidden sm:flex space-x-8 pr-4'}>
                    {headerLinksConfig.map(link => (
                        <HeaderLink key={link.text} Icon={link.Icon} text={link.text}/>
                    ))}
                </div>
                <div className={'pl-4'}>
                    <button
                        onClick={() => signIn('google', {callbackUrl: '/'})}
                        className={'w-[96px] text-blue-700 font-semibold px-5 py-[6px] rounded-full border border-blue-700 transition-all hover:border-2'}
                    >Sign In
                    </button>
                </div>
            </div>
        </header>
    );
};