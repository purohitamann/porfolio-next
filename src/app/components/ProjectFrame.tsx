'use client';
import React from 'react';
import { ArrowRight, Github, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ProjectFrame = ({
    image,
    name,
    techStack,
    link,
    className
}: {
    image: string;
    name: string;
    techStack: string;
    link: string;
    className?: string;
}) => {
    return (
        <div className="relative flex flex-col justify-start items-start text-start transition-transform duration-300 hover:scale-[1.02] p-4">
            <Link href="/projects" className="w-full h-full">
                <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden flex ${className}`}>
                    {/* Left side - Image */}
                    <div className="w-1/2 relative">
                        <Image
                            width={500}
                            height={500}
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right side - Content */}
                    <div className="w-1/2 p-6 flex flex-col justify-between">
                        <div className="overflow-y-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{name}</h3>
                                <ArrowRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            </div>
                            <p className="text-gray-600 line-clamp-3">{techStack}</p>
                        </div>

                        {/* Bottom actions */}
                        <div className="flex items-center justify-between mt-4">
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Github className="h-5 w-5" />
                                <span>View Code</span>
                            </a>
                            <button
                                className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                                aria-label="Like project"
                            >
                                <Heart className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProjectFrame;
