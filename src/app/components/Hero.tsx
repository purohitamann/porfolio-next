import React from 'react';
import hero from '../../data/hero.json';
import './Hero.module.css';

const Hero = () => {
    return (
        <div className="h-3/4 w-screen text-black font-sans font-medium fade-background animate-backgroundFade ">
            <div className="flex flex-col lg:flex-row justify-center items-center h-full px-4 lg:px-0">
                <div>
                    <img
                        src="/working-memoji.png"
                        alt="hero"
                        className="h-48 md:h-72 lg:h-96 animate-float"
                    />
                </div>
                <div className="flex flex-col justify-center items-center text-center gap-2 lg:gap-4">
                    <h1 className=" h1 text-3xl md:text-5xl">{hero.hero.title}</h1>
                    <p className=" p text-md md:text-lg">{hero.hero.description}</p>
                    <p className="p text-sm md:text-lg text-gray-600 font-light">{hero.hero.subtitle}</p>
                    {/* Uncomment for button */}
                    {/* <button className='bg-[#000000] text-white px-8 py-2 rounded-lg'>Contact Me</button> */}
                </div>

            </div>
        </div>
    );
};

export default Hero;
