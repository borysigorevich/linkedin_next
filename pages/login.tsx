import React from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from "next/head";
import {getProviders} from 'next-auth/react'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {HomeHeader} from "@components";
import {Image} from '@common'

import {imgLoader} from "@utils";

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}

const Login = ({providers}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <div className={'relative space-y-10'}>
            <Head>
                <title>Home | Linkedin</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <HomeHeader/>
            <main className={'flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto'}>
                <div className={'space-y-6 xl:space-y-10'}>
                    <h1 className={'text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0'}>Welcome
                        to our professional community </h1>

                    <div className={'space-y-4 px-2'}>
                        <div className={'intent'}>
                            <h2 className={'text-xl'}>Search for a job</h2>
                            <ArrowForwardIcon
                                className={'text-gray-700'}
                            />
                        </div>

                        <div className={'intent'}>
                            <h2 className={'text-xl'}>Find a person you know</h2>
                            <ArrowForwardIcon
                                className={'text-gray-700'}
                            />
                        </div>

                        <div className={'intent'}>
                            <h2 className={'text-xl'}>Learn a new skill</h2>
                            <ArrowForwardIcon
                                className={'text-gray-700'}
                            />
                        </div>
                    </div>
                </div>

                <div className={'relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] xl:top-14 xl:right-5'}>
                    <Image
                        loader={imgLoader}
                        src={'https://rb.gy/vkzpzt'}
                        layout={'fill'}
                        objectFit={'contain'}
                        priority
                    />
                </div>

            </main>
        </div>
    );
};

export default Login;