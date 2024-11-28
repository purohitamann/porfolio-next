import React from 'react'
import hero from '../../data/hero.json'
import './Hero.module.css'

const Hero = () => {
    return (
        <div className='h-3/4 w-screen text-black font-sans font-medium bg-[#F2FCE2] fade-background fade-in-out'>
            <div className='flex justify-center items-center h-full'>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <h1 className='text-5xl '>{hero.hero.title}</h1>
                    <p className='text-lg'>{hero.hero.description}</p>
                    <p className='text-lg text-gray-600 font-light'>{hero.hero.subtitle}</p>
                    {/* <button className='bg-[#000000] text-white px-8 py-2 rounded-lg'>Contact Me</button> */}
                </div>
                <div>
                    <img src='/assets/working-memoji.png' alt='hero' className='h-96 animate-float' />
                </div>
            </div>
        </div>
    )
}

export default Hero