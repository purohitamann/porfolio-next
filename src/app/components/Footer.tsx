import React from 'react';
import footer from '../../data/footer.json';
import { Button } from '@/components/ui/button';

const Footer = () => {
    return (
        <div className="h-auto w-full text-black font-sans relative font-medium animate-backgroundFade">

            {/* Main Container */}
            <div className="flex flex-col justify-center items-center w-full px-4 md:px-20 lg:px-44 py-10">

                {/* Title */}
                <p className="text-center md:text-start font-light w-full text-lg md:text-2xl lg:text-4xl mb-6 md:mb-10">
                    {footer.title}
                </p>

                {/* Buttons Container */}
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center w-full">
                    {/* Email Button */}
                    <Button variant="default" className="w-full md:w-auto">
                        <a href={"mailto:" + footer.email} target="_blank" rel="noopener noreferrer">
                            Email Me
                        </a>
                    </Button>

                    {/* Social Media Links */}
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                        <Button variant={"link"} className="text-sm md:text-base">Medium</Button>
                        <Button variant={"link"} className="text-sm md:text-base">LinkedIn</Button>
                        <Button variant={"link"} className="text-sm md:text-base">Instagram</Button>
                        <Button variant={"link"} className="text-sm md:text-base">GitHub</Button>
                        <Button variant={"link"} className="text-sm md:text-base">Blog</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
