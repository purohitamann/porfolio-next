'use client';
import React, { useState } from 'react';
import Hero from '../../data/hero.json';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi'; // Hamburger and Close icons
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Github } from 'lucide-react';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-screen h-20 bg-transparent animate-backgroundFade  top-0 left-0 z-50 md:text-lg fixed">
            <div className="flex justify-between text-lg items-center px-6 md:px-16 py-8">
                {/* Logo or Location */}
                <h1
                    className="text-black font-bold text-3xl -rotate-45 hover:animate-bounce  hover:rotate-3 hover:underline"

                >
                    A
                </h1>

                {/* Hamburger Icon (Visible on small screens) */}
                <div
                    className="md:hidden text-black hover:cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </div>

                {/* Links (Hidden on small screens, visible on medium and larger screens) */}
                <ul className="hidden md:flex text-black justify-between items-center h-full gap-10">

                    <a href="#about" rel="noopener noreferrer"> <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">About</Button></a>


                    <a href="#projects" rel="noopener noreferrer"> <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">Project</Button></a>
                    <a href="#work" rel="noopener noreferrer"> <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">Experience</Button></a>

                    <a href="#contact" rel="noopener noreferrer"> <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">Contact</Button></a>


                    {/* <Button
                        className="text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline"
                        href={Hero.links.linkedin}
                    >
                        LinkedInx
                    </Button> */}
                    <a href={Hero.links.github} target="_blank" rel="noopener noreferrer"> <Github className='text-gray-600 hover:cursor-pointer hover:text-black ' /></a>
                    <a href={Hero.links.linkedin} target="_blank" rel="noopener noreferrer"> <Linkedin className='text-gray-600 hover:cursor-pointer hover:text-black ' /></a>
                    <a href={Hero.links.instagram} target="_blank" rel="noopener noreferrer"> <Instagram className='text-gray-600 hover:cursor-pointer hover:text-black ' /></a>

                </ul>
            </div>

            {/* Mobile Menu (Visible on small screens when `isOpen` is true) */}
            {isOpen && (
                <div className="md:hidden bg-[#ffffff] w-2/4 py-4 absolute top-20 right-8 shadow-lg rounded">
                    <ul className="flex flex-col items-center gap-2 w-1/2 mx-auto   ">
                        <li
                            className="hover:text-gray-600 hover:cursor-pointer "
                            onClick={() => { setIsOpen(false); window.location.href = "#about" }}
                        >
                            About
                        </li>
                        <Separator />
                        <li
                            className="hover:text-gray-600 hover:cursor-pointer"
                            onClick={() => { setIsOpen(false); window.location.href = "#work" }}
                        >
                            Work
                        </li>    <Separator />
                        <li
                            className="hover:text-gray-600 hover:cursor-pointer"
                            onClick={() => { setIsOpen(false); window.location.href = "#contact" }}
                        >
                            Contact
                        </li>    <Separator />
                        <Link
                            className="text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline"
                            href={Hero.links.linkedin}
                            onClick={() => { setIsOpen(false); window.location.href = Hero.links.linkedin }}
                        >
                            LinkedIn
                        </Link>    <Separator />
                        <Link
                            className="text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline"
                            href={Hero.links.instagram}
                            onClick={() => { setIsOpen(false); window.location.href = Hero.links.github }}
                        >
                            Github
                        </Link>
                        <Separator />
                        <Link
                            className="text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline"
                            href={Hero.links.instagram}
                            onClick={() => { setIsOpen(false); window.location.href = Hero.links.instagram }}
                        >
                            Instagram
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
