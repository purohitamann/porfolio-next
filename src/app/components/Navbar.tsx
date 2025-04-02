'use client';
import React, { useState } from 'react';
import Hero from '../../data/hero.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button';
import { Linkedin, Instagram, Github } from 'lucide-react';
import { useCursorHover } from '../hooks/useCursorHover';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const linkCursorHandlers = useCursorHover('link');
    const router = useRouter();

    const scrollToSection = (sectionId: string) => {
        setIsOpen(false);
        
        if (window.location.pathname === '/') {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push(`/#${sectionId}`);
        }
    };

    return (
        <div className="w-screen h-20 bg-background/80 backdrop-blur-sm top-0 left-0 z-50 md:text-lg fixed">
            <div className="flex justify-between text-lg items-center px-6 md:px-16 py-8">
                <h1
                    className="text-foreground font-bold text-3xl -rotate-45 hover:animate-bounce hover:rotate-3"
                    {...linkCursorHandlers}
                >
                    <Link href="/" rel="noopener noreferrer">A</Link>
                </h1>

                <div
                    className="md:hidden text-foreground hover:cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    {...useCursorHover()}
                >
                    {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </div>

                <ul className="hidden md:flex text-foreground justify-between items-center h-full gap-10">
                    <div onClick={() => scrollToSection('about')} {...linkCursorHandlers}> 
                        <Button className="hover:text-muted-foreground text-lg" variant="link">About</Button>
                    </div>

                    {/* <Link href="/projects" {...linkCursorHandlers}> 
                        <Button className="hover:text-muted-foreground text-lg" variant="link">Project</Button>
                    </Link> */}
                    
                    <Link href="/work" {...linkCursorHandlers}> 
                        <Button className="hover:text-muted-foreground text-lg" variant="link">Experience</Button>
                    </Link>
                    
                    <Link href="/resume" {...linkCursorHandlers}> 
                        <Button className="hover:text-muted-foreground text-lg" variant="link">Resume</Button>
                    </Link>

                    <div onClick={() => scrollToSection('contact')} {...linkCursorHandlers}> 
                        <Button className="hover:text-muted-foreground text-lg" variant="link">Contact</Button>
                    </div>

                    <a href={Hero.links.github} target="_blank" rel="noopener noreferrer" {...linkCursorHandlers}> 
                        <Github className='text-muted-foreground hover:text-foreground' />
                    </a>
                    
                    <a href={Hero.links.linkedin} target="_blank" rel="noopener noreferrer" {...linkCursorHandlers}> 
                        <Linkedin className='text-muted-foreground hover:text-foreground' />
                    </a>
                    
                    <a href={Hero.links.instagram} target="_blank" rel="noopener noreferrer" {...linkCursorHandlers}> 
                        <Instagram className='text-muted-foreground hover:text-foreground' />
                    </a>
                </ul>
            </div>

            {isOpen && (
                <div className="md:hidden bg-background/95 w-2/4 py-4 absolute top-20 right-8 shadow-lg rounded">
                    <ul className="flex flex-col items-center gap-2 w-1/2 mx-auto">
                        <li
                            className="text-foreground hover:text-muted-foreground hover:cursor-pointer"
                            onClick={() => scrollToSection('about')}
                            {...linkCursorHandlers}
                        >
                            About
                        </li>
                        <Separator />
                        <li
                            className="text-foreground hover:text-muted-foreground hover:cursor-pointer"
                            onClick={() => router.push('/work')}
                            {...linkCursorHandlers}
                        >
                            Work
                        </li>    
                        <Separator />
                        <li
                            className="text-foreground hover:text-muted-foreground hover:cursor-pointer"
                            onClick={() => scrollToSection('contact')}
                            {...linkCursorHandlers}
                        >
                            Contact
                        </li>    
                        <Separator />
                        <Link
                            className="text-foreground hover:text-muted-foreground hover:cursor-pointer"
                            href={Hero.links.linkedin}
                            onClick={(e) => { e.stopPropagation(); window.open(Hero.links.linkedin, '_blank'); }}
                            {...linkCursorHandlers}
                        >
                            LinkedIn
                        </Link>    
                        <Separator />
                        <Link
                            className="text-foreground hover:text-muted-foreground hover:cursor-pointer"
                            href={Hero.links.github}
                            onClick={(e) => { e.stopPropagation(); window.open(Hero.links.github, '_blank'); }}
                            {...linkCursorHandlers}
                        >
                            Github
                        </Link>
                        <Separator />
                        <Link
                            className="text-foreground hover:text-muted-foreground hover:cursor-pointer"
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
