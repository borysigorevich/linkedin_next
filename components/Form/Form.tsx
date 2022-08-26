import {useSession} from 'next-auth/react';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useRecoilState} from "recoil";

import {handlePostState, modalState} from "@atoms";

export const Form = () => {
    const {data: session} = useSession()

    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [handlePost, setHandlePost] = useRecoilState(handlePostState)


    const [input, setInput] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)
    const handlePhotoUrlChange = (event: ChangeEvent<HTMLInputElement>) => setPhotoUrl(event.target.value)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                input,
                photoUrl,
                username: session?.user?.name,
                email: session?.user?.email,
                userImg: session?.user?.image,
                createdAt: new Date().toString()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        setModalOpen(false)
        setHandlePost(state => !state)
    }

    return (
        <form className={'flex flex-col gap-2 relative text-black/80 dark:text-white/75'} onSubmit={onSubmit}>
            <textarea
                value={input}
                onChange={handleInputChange}
                rows={4}
                className={'bg-transparent focus:outline-none dark:placeholder-white/75 resize-none'}
                placeholder={'What do you want to talk about?'}
            />

            <input
                value={photoUrl}
                onChange={handlePhotoUrlChange}
                type="text"
                placeholder={'Add a photo url (optional)'}
                className={'bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75'}
            />

            <button
                type={'submit'}
                className={'absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 text-white px-3.5 py-0.5 rounded-full disabled:text-black/40 disabled:bg-black/30 disabled:dark:bg-white/75  disabled:cursor-not-allowed'}

                disabled={!input.trim()}
            >Post
            </button>
        </form>
    );
};