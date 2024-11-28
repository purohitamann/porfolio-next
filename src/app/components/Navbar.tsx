import React from 'react';
import Hero from '../../data/hero.json';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='w-screen h-20 bg-transparent fixed '>
            <div className='px-16 py-8'>


                <ul className='flex text-black justify-between items-center h-full  ' >
                    <Link className='text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline ' href={Hero.links.location}>Greater Toronto Area</Link>
                    <div className='flex justify-between items-center h-full gap-10'>
                        <li>About</li>
                        <li>Work</li>
                        <li>Contact</li>
                        <Link className='text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline ' href={Hero.links.linkedin}>LinkedIn</Link>
                        <Link className='text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline ' href={Hero.links.instagram}>Instagram</Link>
                    </div>

                </ul>
            </div>
        </div>
    )
}

export default Navbar