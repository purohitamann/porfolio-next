'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
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
        <div className="w-full top-0 left-0 z-50 fixed">
            <div className="glass w-full border-b border-border/30">
                <div className="max-w-6xl mx-auto flex justify-between items-center px-6 md:px-8 py-4">
                <Link href="/" className="text-foreground font-semibold text-xl hover:text-muted-foreground transition-colors">
                    Aman Purohit
                </Link>

                <button
                    className="md:hidden text-foreground hover:text-muted-foreground transition-colors p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
                </button>

                <nav className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        About
                    </button>
                    
                    <Link href="/work" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Experience
                    </Link>
                    
                    <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Blog
                    </Link>
                    
                    <Link href="/resume" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Resume
                    </Link>

                    <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Contact
                    </button>
                </nav>
                </div>
            </div>
            {isOpen && (
                <div className="glass md:hidden w-full border-b border-border/30">
                    <nav className="max-w-6xl mx-auto px-6 py-4 space-y-4">
                        <button
                            className="block text-foreground hover:text-muted-foreground transition-colors"
                            onClick={() => { scrollToSection('about'); setIsOpen(false); }}
                        >
                            About
                        </button>
                        <Link
                            className="block text-foreground hover:text-muted-foreground transition-colors"
                            href="/work"
                            onClick={() => setIsOpen(false)}
                        >
                            Experience
                        </Link>
                        <Link
                            className="block text-foreground hover:text-muted-foreground transition-colors"
                            href="/blog"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            className="block text-foreground hover:text-muted-foreground transition-colors"
                            href="/resume"
                            onClick={() => setIsOpen(false)}
                        >
                            Resume
                        </Link>
                        <button
                            className="block text-foreground hover:text-muted-foreground transition-colors"
                            onClick={() => { scrollToSection('contact'); setIsOpen(false); }}
                        >
                            Contact
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;
