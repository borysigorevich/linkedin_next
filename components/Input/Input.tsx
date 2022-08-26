import React from 'react';
import {useSession} from 'next-auth/react';
import {motion} from 'framer-motion'

import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArticleIcon from '@mui/icons-material/Article';

import {useRecoilState} from "recoil";
import {modalState, modalTypeState} from "@atoms";
import {Image} from "@common";

export const Input = () => {
    const {data} = useSession()
    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [modalType, setModalType] = useRecoilState(modalTypeState)

    return (
        <div className={'bg-white dark:bg-[#1d2226] rounded-lg p-3 space-y-3 border border-gray-300 dark:border-0'}>

            <div className={'grid items-center space-x-2 grid-cols-[3.5rem_1fr]'}>
                <div className={'relative h-14 w-14 rounded-full overflow-hidden cursor-pointer bg-white'}>
                    <Image
                        src={data?.user?.image!}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </div>

                <motion.button
                    whileHover={{scale: 1.01}}
                    whileTap={{scale: 0.99}}
                    className={'px-3 py-2.5 rounded-full border border-gray-400 opacity-80 hover:opacity-100 font-medium text-left'}
                    onClick={() => {
                        setModalOpen(true)
                        setModalType('dropIn')
                    }}
                >
                    Start a post
                </motion.button>
            </div>

            <div className={'flex items-center flex-wrap justify-center gap-4 md:gap-x-8'}>
                <button className="inputButton group">
                    <PhotoSizeSelectActualIcon className="text-blue-400"/>
                    <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
                </button>
                <button className="inputButton group">
                    <VideoCameraBackIcon className="text-green-400"/>
                    <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
                </button>
                <button className="inputButton group">
                    <BusinessCenterIcon className="text-blue-300"/>
                    <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
                </button>
                <button className="inputButton group">
                    <ArticleIcon className="text-red-400"/>
                    <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">
                        Write Article
                    </h4>
                </button>
            </div>
        </div>
    );
};