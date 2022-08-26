import React from 'react';
import {useSession} from 'next-auth/react';
import {motion} from 'framer-motion'
import {useRecoilValue} from "recoil";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import {Backdrop, Form, Post} from "@components";
import {Image, MuiIconButton} from "@common";
import {imgLoader} from "@utils";
import {getPostState} from "@atoms";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const gifYouUp = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.15,
            ease: "easeOut",
        },
    },
};

type ModalProps = {
    handleClose: () => void
    type: string
}

export const Modal = ({handleClose, type}: ModalProps) => {
    const post = useRecoilValue(getPostState)
    const {data} = useSession()

    return (
        <Backdrop onClick={handleClose}>
            {type === "dropIn" && (
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg md:-mt-96 mx-6"
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex items-center justify-between border-b border-black/60 dark:border-white/75 px-4 py-2.5">
                        <h4 className="text-xl">Create a post</h4>
                        <MuiIconButton onClick={handleClose}>
                            <CloseRoundedIcon className="h-7 w-7 dark:text-white/75"/>
                        </MuiIconButton>
                    </div>

                    <div className="p-4 space-y-2">
                        <div className="flex items-center space-x-2">
                            <div className={'relative h-11 w-11 rounded-full overflow-hidden cursor-pointer'}>
                                <Image
                                    src={data?.user?.image!}
                                    layout={'fill'}
                                    objectFit={'contain'}
                                />
                            </div>
                            <h6>{data?.user?.name}</h6>
                        </div>

                        <Form/>
                    </div>
                </motion.div>
            )}

            {type === "gifYouUp" && (
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-lg flex bg-[#1D2226] w-full max-w-6xl h-[60vh] -mt-[7vh] mx-6 overflow-hidden"
                    variants={gifYouUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={'relative w-full max-h-[80vh] max-w-3xl rounded-l-lg'}>
                        <Image
                            loader={imgLoader}
                            src={post!.photoUrl}
                            layout={'fill'}
                            objectFit={'cover'}
                        />
                    </div>
                    <div className="w-full md:w-3/5 bg-white dark:bg-[#1D2226] rounded-r-lg">
                        <Post post={post!} modalPost/>
                    </div>
                </motion.div>
            )}
        </Backdrop>
    );
};