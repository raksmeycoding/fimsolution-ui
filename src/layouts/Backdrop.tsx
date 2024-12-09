import React, {useState} from 'react';
import {motion} from "motion/react"

interface BackdropProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({children, onClick}) => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.5, // Smooth transition for the backdrop
            }}
            onClick={onClick}
            className="absolute top-0 left-0 bottom-0 right-0  flex justify-center items-center backdrop-blur-sm">
            {children}
        </motion.div>
    );
};

export default Backdrop;