import React, {useEffect, useState} from 'react';
import {Input, Post} from "@components";
import {PostType} from "@types";
import {useRecoilState} from "recoil";

import {handlePostState, useSSRPostState} from "@atoms";

type FeedProps = {
    posts: PostType[]
}

export const Feed = ({posts}: FeedProps) => {

    const [clientPosts, setClientPosts] = useState<PostType[]>([])

    const [handlePost, setHandlePost] = useRecoilState(handlePostState)
    const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostState)

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setClientPosts(data)
        }
        fetchPosts()
        setUseSSRPosts(false)

        // setHandlePost(state => !state)
    }, [handlePost])

    return (
        <div className={'space-y-6 pb-24 max-w-xl'}>
            <Input/>
            {useSSRPosts
                ? posts.map(post => (
                    <Post key={post._id} post={post}/>
                ))
                : clientPosts.map(post => (
                    <Post key={post._id} post={post}/>
                ))
            }
        </div>
    );
};