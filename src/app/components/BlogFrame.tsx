'use client'
import React from 'react'
import { animate, motion } from 'framer-motion'
import { useMotionValue } from 'framer-motion'
interface BlogFrameProps {
    title: string;
    description: string;
    link: string;
    timePosted: string;
}

const BlogFrame = ({ title, description, link, timePosted }: BlogFrameProps) => {
    const handleClick = () => {
        window.open(link, '_blank');
    }
    const x = useMotionValue(0);
    return (
        <motion.div className='flex-col md:flex w-full justify-between items-stretch h-auto hover:animate-backgroundFade '

            // Animate when this value changes:
            initial={{ boxShadow: "0px 0px #000" }}
            onHoverStart={() => { animate(x, 10); }}
            onHoverEnd={() => { animate(x, 0); }}
            animate={{ boxShadow: "10px 10px #000" }}
            style={{ x, y: 0 }}>
            <form onClick={() => { handleClick() }} className='flex flex-col md:flex-row w-full justify-between items-stretch h-auto p-4 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold '>{title}</h1>
                <div className='flex flex-col justify-start items-start w-full md:w-1/3'>
                    <p className='text-lg font-light'>{description}</p>
                    <p className='text-sm font-light'>{timePosted}</p>

                </div>

            </form>

        </motion.div>
    )
}

export default BlogFrame