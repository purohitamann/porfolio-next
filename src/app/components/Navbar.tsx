'use client';
import React, { useState } from 'react';
import Hero from '../../data/hero.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi'; // Hamburger and Close icons
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Github } from 'lucide-react';
import { useCursorHover } from '../hooks/useCursorHover';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    /**
     * A constant that holds the handlers for cursor hover effects on links.
     * 
     * This is initialized using the `useCursorHover` hook with the argument 'link',
     * which likely sets up specific cursor styles or behaviors when hovering over links.
     */
    const linkCursorHandlers = useCursorHover('link');
    const router = useRouter();

    const scrollToSection = (sectionId: string) => {
        setIsOpen(false);
        
        // If we're on the homepage, scroll to the section
        if (window.location.pathname === '/') {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If we're on another page, navigate to homepage and then scroll
            router.push(`/#${sectionId}`);
        }
    };

    return (
        <div className="w-screen h-20 bg-transparent animate-backgroundFade top-0 left-0 z-50 md:text-lg fixed">
            <div className="flex justify-between text-lg items-center px-6 md:px-16 py-8">
                {/* Logo or Location */}
                <h1
                    className="text-black font-bold text-3xl -rotate-45 hover:animate-bounce hover:rotate-3 hover:underline"
                    {...linkCursorHandlers}
                >
                    <Link href="/" rel="noopener noreferrer">A</Link>
                </h1>

                {/* Hamburger Icon (Visible on small screens) */}
                <div
                    className="md:hidden text-black hover:cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    {...useCursorHover()}
                >
                    {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </div>

                {/* Links (Hidden on small screens, visible on medium and larger screens) */}
                <ul className="hidden md:flex text-black justify-between items-center h-full gap-10">
                    <div onClick={() => scrollToSection('about')} {...linkCursorHandlers}> 
                        <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">About</Button>
                    </div>

                    <Link href="/projects" {...linkCursorHandlers}> 
                        <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">Project</Button>
                    </Link>
                    
                    <Link href="/work" {...linkCursorHandlers}> 
                        <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">Experience</Button>
                    </Link>
                    <Link href="/resume" {...linkCursorHandlers}> 
                        <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">Resume</Button>
                    </Link>

                    <div onClick={() => scrollToSection('contact')} {...linkCursorHandlers}> 
                        <Button className="hover:text-gray-600 hover:cursor-pointer text-lg" variant="link">Contact</Button>
                    </div>

                    <a href={Hero.links.github} target="_blank" rel="noopener noreferrer" {...linkCursorHandlers}> 
                        <Github className='text-gray-600 hover:cursor-pointer hover:text-black' />
                    </a>
                    
                    <a href={Hero.links.linkedin} target="_blank" rel="noopener noreferrer" {...linkCursorHandlers}> 
                        <Linkedin className='text-gray-600 hover:cursor-pointer hover:text-black' />
                    </a>
                    
                    <a href={Hero.links.instagram} target="_blank" rel="noopener noreferrer" {...linkCursorHandlers}> 
                        <Instagram className='text-gray-600 hover:cursor-pointer hover:text-black' />
                    </a>
                </ul>
            </div>

            {/* Mobile Menu (Visible on small screens when `isOpen` is true) */}
            {isOpen && (
                <div className="md:hidden bg-[#ffffff] w-2/4 py-4 absolute top-20 right-8 shadow-lg rounded">
                    <ul className="flex flex-col items-center gap-2 w-1/2 mx-auto">
                        <li
                            className="hover:text-gray-600 hover:cursor-pointer"
                            onClick={() => scrollToSection('about')}
                            {...linkCursorHandlers}
                        >
                            About
                        </li>
                        <Separator />
                        <li
                            className="hover:text-gray-600 hover:cursor-pointer"
                            onClick={() => router.push('/work')}
                            {...linkCursorHandlers}
                        >
                            Work
                        </li>    
                        <Separator />
                        <li
                            className="hover:text-gray-600 hover:cursor-pointer"
                            onClick={() => scrollToSection('contact')}
                            {...linkCursorHandlers}
                        >
                            Contact
                        </li>    
                        <Separator />
                        <Link
                            className="text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline"
                            href={Hero.links.linkedin}
                            onClick={(e) => { e.stopPropagation(); window.open(Hero.links.linkedin, '_blank'); }}
                            {...linkCursorHandlers}
                        >
                            LinkedIn
                        </Link>    
                        <Separator />
                        <Link
                            className="text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline"
                            href={Hero.links.github}
                            onClick={(e) => { e.stopPropagation(); window.open(Hero.links.github, '_blank'); }}
                            {...linkCursorHandlers}
                        >
                            Github
                        </Link>
                        <Separator />
                        <Link
                            className="text-black hover:text-gray-600 hover:cursor-pointer hover:rotate-3 hover:underline"
                            href={Hero.links.instagram}
                            onClick={(e) => { e.stopPropagation(); window.open(Hero.links.instagram, '_blank'); }}
                            {...linkCursorHandlers}
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
