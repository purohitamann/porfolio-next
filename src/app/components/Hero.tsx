import React from 'react';
import hero from '../../data/hero.json';
import './Hero.module.css';
import { motion } from 'framer-motion';
export default function Hero() {

    // animate() function

    return (
        <div className="h-3/4 w-screen text-black font-sans  font-medium fade-background animate-backgroundFade " id='about'>
            <div className="flex flex-col  align-center lg:flex-row justify-center items-center h-full px-4 lg:px-0">

                <div className="flex animate-fade flex-col md:text-6xl justify-center items-center text-center gap-2 lg:gap-4">
                    <h1 className=" h1 text-3xl md:text-8xl">{hero.hero.title}</h1>
                    <p className=" font-light  text-gray-600 md:text-2xl ">{hero.hero.description}</p>

                    {/* Uncomment for button */}
                    {/* <button className='bg-[#000000] text-white px-8 py-2 rounded-lg'>Contact Me</button> */}
                </div>
                {/* <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                /> */}
            </div>

        </div>
    );
};

