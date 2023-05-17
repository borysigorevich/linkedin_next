import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {useSession} from "next-auth/react";
import TimeAgo from 'timeago-react'

import {getPostState, handlePostState, modalState, modalTypeState} from "@atoms";
import {Image, MuiIconButton} from '@common'
import {imgLoader} from "@utils";
import {PostType} from "@types";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';

type PostProps = {
    post: PostType
    modalPost?: boolean
}

export const Post = ({post, modalPost}: PostProps) => {
    const {data} = useSession()

    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [postState, setPostState] = useRecoilState(getPostState)
    const [modalType, setModalType] = useRecoilState(modalTypeState)
    const [handlePost, setHandlePost] = useRecoilState(handlePostState)

    const [showInput, setShowInput] = useState(false)
    const [liked, setLiked] = useState(false)

    const truncate = (input: string, charQuantity: number) => {
        return input.length > charQuantity
            ? <>{input.substring(0, charQuantity)} <span
                onClick={() => setShowInput(true)}
                className={'cursor-pointer text-blue-500 hover:underline'}>...see more</span></>
            : input
    }

    const handleOpenModal = () => {
        setModalOpen(true)
        setModalType('gifYouUp')
        setPostState(post)
    }

    const handleDeletePost = async () => {
        const response = await fetch(`/api/posts/${post._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setHandlePost(state => !state)
        setModalOpen(false)
    }

    return (
        <div
            className={`bg-white dark:bg-[#1d2226] ${modalPost ? 'rounded-tr-lg' : 'rounded-lg'} overflow-hidden space-y-2 py-2.5`}>

            <div className={`flex items-center px-2.5 cursor-pointer`}>
                <div className={'relative h-10 w-10 rounded-full overflow-hidden cursor-pointer bg-white'}>
                    <Image
                        loader={imgLoader}
                        src={post?.userImg}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </div>

                <div className={'ml-2 leading-none'}>
                    <h6 className={'font-medium hover:text-blue-600 hover:underline'}>{post.username}</h6>
                    <p className={'text-sm dark:text-white/75 opacity-80'}>{post.email}</p>
                    <TimeAgo
                        className={'text-sm dark:text-white/75 opacity-80'}
                        locale={'vi'}
                        datetime={post.createdAt}
                    />
                </div>

                {modalPost
                    ? <MuiIconButton className={'ml-auto'} onClick={() => setModalOpen(false)}>
                        <CloseRoundedIcon className={'dark:text-white/75 w-7 h-7'}/>
                    </MuiIconButton>
                    : <MuiIconButton className={'ml-auto'}>
                        <MoreHorizIcon className={'dark:text-white/75 w-7 h-7'}/>
                    </MuiIconButton>
                }

            </div>

            {post.input && (
                <div className={'px-2.5 break-all md:break-normal'}>
                    {modalPost || showInput
                        ? <p onClick={() => setShowInput(false)}>{post.input}</p>
                        : <p>
                            {truncate(post.input, 150)}
                        </p>
                    }
                </div>
            )}

            {post.photoUrl && !modalPost &&
                <div className={'relative w-full h-52 cursor-pointer'} onClick={handleOpenModal}>
                    <Image
                        loader={imgLoader}
                        src={post.photoUrl}
                        layout={'fill'}
                        objectFit={'cover'}
                    />
                </div>
            }

            <div
                className={'flex items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75'}>
                {modalPost
                    ? <button className={'postButton'}>
                        <ModeCommentIcon/>
                        <h4>Comment</h4>
                    </button>
                    : <button className={`postButton ${liked && 'text-blue-500'}`}
                              onClick={() => setLiked(state => !state)}>
                        {liked
                            ? <ThumbUpIcon className={'-scale-x-100'}/>
                            : <ThumbUpOutlinedIcon className={'-scale-x-100'}/>
                        }
                        <h4>Like</h4>
                    </button>
                }

                {data?.user?.email === post.email
                    ? <button className={'postButton focus:text-red-400'} onClick={handleDeletePost}>
                        <DeleteRoundedIcon/>
                        <h4>Delete post</h4>
                    </button>
                    : <button className={'postButton '}>
                        <ReplyRoundedIcon className={'-scale-x-100'}/>
                        <h4>Share post</h4>
                    </button>
                }

            </div>

        </div>
    );
};