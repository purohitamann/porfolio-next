import React from 'react';
import footer from '../../data/footer.json';
import { Button } from '@/components/ui/button';

type Props = {
    className?: string;
}

const Footer = ({ className }: Props) => {
    return (
        <div className={`h-auto w-full text-foreground font-sans relative font-medium bg-[radial-gradient(circle_at_50%_120%,rgba(120,120,120,0.1),transparent)] ${className}`} id="contact">
            <div className="flex flex-col justify-center items-center w-full px-4 md:px-20 lg:px-44 py-10">
                <div className="flex flex-row text-wrap md:pb-20 justify-start items-start text-start gap-4 w-auto">
                    <h1 className="text-foreground hidden md:flex font-bold text-3xl mr-10 pr-10 -rotate-45 hover:rotate-3">
                        A
                    </h1>
                    <p className="text-center md:text-start font-light w-full md:w-1/2 text-lg md:text-2xl lg:text-4xl mb-6 md:mb-10">
                        {footer.title}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center w-full">
                    <Button variant="outline" className="w-full md:w-auto">
                        <a href={"mailto:" + footer.email} target="_blank" rel="noopener noreferrer">
                            Email Me
                        </a>
                    </Button>

                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                        <Button variant="link" className="text-sm md:text-base"><a href={footer.medium}>Medium</a></Button>
                        <Button variant="link" className="text-sm md:text-base"><a href={footer.linkedin}>LinkedIn</a></Button>
                        <Button variant="link" className="text-sm md:text-base"><a href={footer.instagram}>Instagram</a></Button>
                        <Button variant="link" className="text-sm md:text-base"><a href={footer.github}>Github</a></Button>
                        <Button variant="link" className="text-sm md:text-base"><a href="#blog">Blog</a></Button>
                        <p className="text-muted-foreground"> &copy; 2024 All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
