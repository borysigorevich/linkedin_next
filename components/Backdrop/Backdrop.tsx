import React, {ReactNode} from 'react';
import {motion} from 'framer-motion'

type BackdropProps = {
    children: ReactNode
    onClick: () => void
}

export const Backdrop = ({children, onClick}: BackdropProps) => {
    return (
        <motion.div
            className={'absolute top-0 left-0 w-full h-full bg-black/70 overflow-y-scroll flex items-center justify-center z-50'}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};