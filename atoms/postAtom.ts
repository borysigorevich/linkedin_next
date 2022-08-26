import {atom} from "recoil";
import {PostType} from "@types";

export const handlePostState = atom({
    key: 'handlePostState',
    default: false
})
export const getPostState = atom<PostType | null>({
    key: 'getPostState',
    default: null
})
export const useSSRPostState = atom({
    key: 'useSSRPostState',
    default: true
})